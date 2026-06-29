import useConversation from "./useConversation";

import useDocuments from "./useDocuments";

import useStreaming from "./useStreaming";

import usePersistence from "./usePersistence";

export default function useRagAssistant() {

    // ==================================================
    // Conversation
    // ==================================================

    const {

        conversations,

        setConversations,

        selectedConversation,

        setSelectedConversation,

        createConversation,

        deleteConversation,

        renameConversation,

        togglePinConversation,

        appendMessage,

        appendAssistantToken,

        updateAssistantSources,

        createUserMessage,

        createAssistantMessage

    } = useConversation();

    // ==================================================
    // Documents
    // ==================================================

    const {

        file,

        setFile,

        documents,

        loadDocuments,

        removeDocument,

        uploading,

        uploadSuccess,

        uploadError,

        loadingDocuments,

        uploadFile

    } = useDocuments();

    // ==================================================
    // Streaming
    // ==================================================

    const {

        stream,

        stopGeneration,

        isStreaming,

        status,

        streamError

    } = useStreaming();

    // ==================================================
    // Persistence
    // ==================================================

    usePersistence(

        conversations,

        selectedConversation,

        setConversations,

        setSelectedConversation

    );

    // ==================================================
    // Helpers
    // ==================================================

    const getCurrentConversation = () =>

        conversations.find(

            conversation =>

                conversation.id ===

                selectedConversation

        );

    // ==================================================
    // Initialize Chat
    // ==================================================

    const initializeChat = (

        question

    ) => {

        const userMessage =

            createUserMessage(

                question

            );

        const assistantMessage =

            createAssistantMessage();

        let conversation =

            getCurrentConversation();

        if (!conversation) {

            const title =

                question.length > 40

                    ? question.substring(

                        0,

                        40

                    ) + "..."

                    : question;

            conversation =

                createConversation(

                    title,

                    [

                        userMessage,

                        assistantMessage

                    ]

                );

        }

        else {

            appendMessage(

                conversation.id,

                [

                    userMessage,

                    assistantMessage

                ]

            );

        }

        return {

            conversation,

            assistantMessage

        };

    };

    // ==================================================
    // Stream Event Handler
    // ==================================================

    const handleStreamEvent = (

        event,

        conversation,

        assistantMessage

    ) => {

        switch (

            event.event

        ) {

            case "started":

                break;

            case "status":

                break;

            case "token":

                appendAssistantToken(

                    conversation.id,

                    assistantMessage.id,

                    event.data

                );

                break;

            case "sources":

                updateAssistantSources(

                    conversation.id,

                    assistantMessage.id,

                    event.data

                );

                break;

            case "done":

                break;

            case "finished":

                break;

            case "aborted":

                break;

            case "error":

                break;

            default:

                break;

        }

    };

    // ==================================================
    // Ask Question
    // ==================================================

    const askQuestion = async (

        question

    ) => {

        const userQuestion =

            question?.trim();

        if (!userQuestion) {

            return;

        }

        const {

            conversation,

            assistantMessage

        } = initializeChat(

            userQuestion

        );

        try {

            await stream(

                userQuestion,

                event =>

                    handleStreamEvent(

                        event,

                        conversation,

                        assistantMessage

                    )

            );

        }

        catch (error) {

            console.error(error);

        }

    };

    // ==================================================
    // Exports
    // ==================================================

    return {

        // Conversation

        conversations,

        selectedConversation,

        setSelectedConversation,

        createConversation,

        deleteConversation,

        renameConversation,

        togglePinConversation,

        // Documents

        file,

        setFile,

        documents,

        loadDocuments,

        uploadFile,

        removeDocument,

        uploading,

        uploadSuccess,

        uploadError,

        loadingDocuments,

        // Streaming

        isStreaming,

        status,

        streamError,

        stopGeneration,

        // AI

        askQuestion

    };

}