import { useEffect, useRef, useState } from "react";

import { streamQuestion } from "../services/api";

export default function useStreaming() {

    // ==================================================
    // States
    // ==================================================

    const [isStreaming, setIsStreaming] = useState(false);

    const [status, setStatus] = useState("");

    const [streamError, setStreamError] = useState(null);

    // ==================================================
    // Refs
    // ==================================================

    const abortControllerRef = useRef(null);

    // ==================================================
    // Stop Generation
    // ==================================================

    const stopGeneration = () => {

        if (abortControllerRef.current) {

            abortControllerRef.current.abort();

            abortControllerRef.current = null;

        }

        setIsStreaming(false);

        setStatus("");

    };

    // ==================================================
    // Stream
    // ==================================================

    const stream = async (

        question,

        onEvent

    ) => {

        // Prevent multiple simultaneous streams

        if (isStreaming) {

            return;

        }

        try {

            setStreamError(null);

            setIsStreaming(true);

            setStatus("Connecting...");

            // Abort any previous stream

            if (abortControllerRef.current) {

                abortControllerRef.current.abort();

            }

            abortControllerRef.current =

                new AbortController();

            // Notify UI

            onEvent?.({

                event: "started",

                data: null

            });

            for await (

                const event of streamQuestion(

                    question,

                    abortControllerRef.current.signal

                )

            ) {

                switch (event.event) {

                    case "status":

                        setStatus(event.data);

                        break;

                    case "done":

                        setStatus("");

                        break;

                    default:

                        break;

                }

                onEvent?.(event);

            }

        }

        catch (error) {

            if (error.name === "AbortError") {

                onEvent?.({

                    event: "aborted",

                    data: null

                });

            }

            else {

                console.error(error);

                setStreamError(error);

                onEvent?.({

                    event: "error",

                    data: error

                });

            }

        }

        finally {

            setIsStreaming(false);

            setStatus("");

            abortControllerRef.current = null;

            onEvent?.({

                event: "finished",

                data: null

            });

        }

    };

    // ==================================================
    // Cleanup
    // ==================================================

    useEffect(() => {

        return () => {

            if (abortControllerRef.current) {

                abortControllerRef.current.abort();

            }

        };

    }, []);

    // ==================================================
    // Exports
    // ==================================================

    return {

        stream,

        stopGeneration,

        isStreaming,

        status,

        streamError

    };

}