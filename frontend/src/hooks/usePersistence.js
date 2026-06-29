import { useEffect } from "react";

import {

    saveAppState,

    loadAppState

} from "../utils/storage";


// ======================================================
// Persistence Hook
// ======================================================

export default function usePersistence(

    conversations,

    selectedConversation,

    setConversations,

    setSelectedConversation

) {

    // ==================================================
    // Restore State
    // ==================================================

    useEffect(() => {

        const state = loadAppState();

        if (!state) return;

        setConversations(

            state.conversations || []

        );

        setSelectedConversation(

            state.selectedConversation || null

        );

    }, [

        setConversations,

        setSelectedConversation

    ]);

    // ==================================================
    // Auto Save
    // ==================================================

    useEffect(() => {

        const appState = {

            conversations,

            selectedConversation,

            uploadedDocuments: [],

            theme: "light",

            version: 2

        };

        saveAppState(appState);

    }, [

        conversations,

        selectedConversation

    ]);

}