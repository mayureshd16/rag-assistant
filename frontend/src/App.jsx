import { useMemo, useState } from "react";

import {
    Box,
    Paper,
    Typography
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "./theme/theme";

import "./App.css";

import Sidebar from "./components/layout/Sidebar";
import ChatHistory from "./components/chat/ChatHistory";
import ChatInput from "./components/input/ChatInput";

import useRagAssistant from "./hooks/useRagAssistant";

function App() {

    // ==================================================
    // Theme
    // ==================================================

    const [mode, setMode] = useState("light");

    const theme = useMemo(

        () => getTheme(mode),

        [mode]

    );

    // ==================================================
    // Question (UI State)
    // ==================================================

    const [

        question,

        setQuestion

    ] = useState("");

    // ==================================================
    // Hook
    // ==================================================

    const {

        // Documents

        file,

        setFile,

        documents,

        uploadFile,

        uploading,

        uploadSuccess,

        // Conversation

        conversations,

        selectedConversation,

        setSelectedConversation,

        createConversation,

        deleteConversation,

        renameConversation,

        togglePinConversation,

        // Streaming

        askQuestion,

        isStreaming,

        stopGeneration,

        status

    } = useRagAssistant();

    // ==================================================
    // Current Conversation
    // ==================================================

    const currentConversation =

        conversations.find(

            conversation =>

                conversation.id ===

                selectedConversation

        );

    const currentMessages =

        currentConversation?.messages || [];

    return (

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <Box

                sx={{

                    display: "flex",

                    height: "100vh",

                    bgcolor: "background.default"

                }}

            >

                {/* Sidebar */}

                <Sidebar

                    conversations={conversations}

                    selectedConversation={selectedConversation}

                    setSelectedConversation={setSelectedConversation}

                    createConversation={createConversation}

                    renameConversation={renameConversation}

                    deleteConversation={deleteConversation}

                    togglePinConversation={togglePinConversation}

                    mode={mode}

                    setMode={setMode}

                />

                {/* Main */}

                <Box

                    sx={{

                        flex: 1,

                        display: "flex",

                        flexDirection: "column",

                        overflow: "hidden"

                    }}

                >

                    {/* Header */}

                    <Paper

                        elevation={2}

                        sx={{

                            px: 4,

                            py: 3,

                            borderRadius: 0

                        }}

                    >

                        <Typography

                            variant="h4"

                            fontWeight="bold"

                        >

                            🤖 Multi-Document RAG Assistant

                        </Typography>

                        <Typography

                            color="text.secondary"

                            sx={{

                                mt: 1

                            }}

                        >

                            Chat with your uploaded documents using AI.

                        </Typography>

                    </Paper>

                    {/* Chat */}

                    <Box

                        sx={{

                            flex: 1,

                            overflowY: "auto",

                            px: 4,

                            py: 3,

                            scrollBehavior: "smooth"

                        }}

                    >

                        <ChatHistory

                            chatHistory={currentMessages}

                            loading={isStreaming}

                        />

                    </Box>

                    {/* Input */}

                    <Paper

                        elevation={8}

                        sx={{

                            p: 2,

                            borderTop: "1px solid",

                            borderColor: "divider"

                        }}

                    >

                        <ChatInput

                            question={question}

                            setQuestion={setQuestion}

                            askQuestion={askQuestion}

                            isStreaming={isStreaming}

                            file={file}

                            setFile={setFile}

                            uploadFile={uploadFile}

                            uploading={uploading}

                            uploadSuccess={uploadSuccess}

                        />

                    </Paper>

                </Box>

            </Box>

        </ThemeProvider>

    );

}

export default App;