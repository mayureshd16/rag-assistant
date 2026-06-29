import axios from "axios";

import { API_CONFIG } from "../constants/api";

const api = axios.create({

    baseURL: API_CONFIG.BASE_URL,

    timeout: API_CONFIG.REQUEST_TIMEOUT

});

// ======================================================
// Upload
// ======================================================

export const uploadDocument = (formData) =>

    api.post("/upload", formData);

// ======================================================
// Normal Query
// ======================================================

export const askQuestions = (questions) =>

    api.post("/query", {

        questions

    });

// ======================================================
// Streaming Query
// ======================================================

export async function* streamQuestion(

    question,

    signal

) {

    const response = await fetch(

        `${API_CONFIG.BASE_URL}/query/stream`,

        {

            method: "POST",

            signal,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                question

            })

        }

    );

    if (!response.ok) {

        throw new Error(

            `Streaming failed (${response.status})`

        );

    }

    if (!response.body) {

        throw new Error(

            "Streaming is not supported by this browser."

        );

    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    try {

        while (true) {

            const {

                value,

                done

            } = await reader.read();

            if (done) {

                break;

            }

            buffer += decoder.decode(

                value,

                {

                    stream: true

                }

            );

            const lines = buffer.split("\n");

            buffer = lines.pop() || "";

            for (const line of lines) {

                if (!line.trim()) {

                    continue;

                }

                try {

                    yield JSON.parse(line);

                }

                catch (error) {

                    console.warn(

                        "Invalid JSON stream chunk:",

                        line

                    );

                }

            }

        }

        // Handle remaining buffered JSON

        if (buffer.trim()) {

            try {

                yield JSON.parse(buffer);

            }

            catch {

                // Ignore incomplete buffer

            }

        }

    }

    finally {

        reader.releaseLock();

    }

}

// ======================================================
// Documents
// ======================================================

export const getDocuments = () =>

    api.get("/documents");

export const deleteDocument = (documentId) =>

    api.delete(

        `/documents/${documentId}`

    );

// ======================================================
// Database
// ======================================================

export const clearDatabase = () =>

    api.delete("/clear");

export default api;