import { useState } from "react";

import {

    formatTime,

    formatDateTime

} from "../utils/date";

export default function useConversation() {

    // ==================================================
    // States
    // ==================================================

    const [

        conversations,

        setConversations

    ] = useState([]);

    const [

        selectedConversation,

        setSelectedConversation

    ] = useState(null);

    // ==================================================
    // Sort Conversations
    // ==================================================

    const sortConversations = (items) => {

        return [...items].sort((a, b) => {

            if (a.pinned !== b.pinned) {

                return b.pinned - a.pinned;

            }

            return (

                new Date(b.updatedAt)

                -

                new Date(a.updatedAt)

            );

        });

    };

    // ==================================================
    // Create Conversation
    // ==================================================

    const createConversation = (

        title = "New Chat",

        initialMessages = []

    ) => {

        const now = formatDateTime();

        const conversation = {

            id: crypto.randomUUID(),

            title,

            createdAt: now,

            updatedAt: now,

            pinned: false,

            messages: initialMessages

        };

        setConversations(previous =>

            sortConversations([

                conversation,

                ...previous

            ])

        );

        setSelectedConversation(

            conversation.id

        );

        return conversation;

    };

    // ==================================================
    // Delete Conversation
    // ==================================================

    const deleteConversation = (

        conversationId

    ) => {

        setConversations(previous => {

            const updated = previous.filter(

                conversation =>

                    conversation.id !== conversationId

            );

            if (

                selectedConversation === conversationId

            ) {

                setSelectedConversation(

                    updated.length

                        ? updated[0].id

                        : null

                );

            }

            return updated;

        });

    };

    // ==================================================
    // Rename Conversation
    // ==================================================

    const renameConversation = (

        conversationId,

        title

    ) => {

        if (!title.trim()) return;

        setConversations(previous =>

            previous.map(conversation =>

                conversation.id === conversationId

                    ? {

                          ...conversation,

                          title: title.trim(),

                          updatedAt: formatDateTime()

                      }

                    : conversation

            )

        );

    };

    // ==================================================
    // Pin / Unpin Conversation
    // ==================================================

    const togglePinConversation = (

        conversationId

    ) => {

        setConversations(previous =>

            sortConversations(

                previous.map(conversation =>

                    conversation.id === conversationId

                        ? {

                              ...conversation,

                              pinned:

                                  !conversation.pinned

                          }

                        : conversation

                )

            )

        );

    };

    // ==================================================
    // Internal Helper
    // Append Any Message
    // ==================================================

    const appendMessage = (

        conversationId,

        messages

    ) => {

        const messageList =

            Array.isArray(messages)

                ? messages

                : [messages];

        setConversations(previous =>

            sortConversations(

                previous.map(conversation => {

                    if (

                        conversation.id !== conversationId

                    ) {

                        return conversation;

                    }

                    return {

                        ...conversation,

                        updatedAt: formatDateTime(),

                        messages: [

                            ...conversation.messages,

                            ...messageList

                        ]

                    };

                })

            )

        );

        return messageList;

    };

    // ==================================================
    // Internal Helper
    // Update Message
    // ==================================================

    const updateMessage = (

        conversationId,

        messageId,

        updater

    ) => {

        setConversations(previous =>

            sortConversations(

                previous.map(conversation =>

                    conversation.id === conversationId

                        ? {

                            ...conversation,

                            title: title.trim(),

                            updatedAt: formatDateTime()

                        }

                        : conversation

                )

            )

        );
    };


    // ==================================================
    // Append Assistant Token
    // ==================================================

    const appendAssistantToken = (

        conversationId,

        assistantMessageId,

        token

    ) => {

        updateMessage(

            conversationId,

            assistantMessageId,

            message => ({

                ...message,

                text: message.text + token

            })

        );

    };


    // ==================================================
    // Update Assistant Sources
    // ==================================================

    const updateAssistantSources = (

        conversationId,

        assistantMessageId,

        sources

    ) => {

        updateMessage(

            conversationId,

            assistantMessageId,

            message => ({

                ...message,

                sources

            })

        );

    };

    // ==================================================
    // Internal Helper
    // Create Message
    // ==================================================

    const createMessage = ({

        type,

        text = "",

        sources = []

    }) => ({

        id: crypto.randomUUID(),

        type,

        text,

        sources,

        timestamp: formatTime()

    });

    // ==================================================
    // Message Builders
    // ==================================================

    const createUserMessage = (text) =>

        createMessage({

            type: "user",

            text

        });

    const createAssistantMessage = () =>

        createMessage({

            type: "assistant"

        });

    // ==================================================
    // Exports
    // ==================================================

    return {

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

    };

}