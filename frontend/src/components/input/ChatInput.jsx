import {
    Box,
    Button,
    Chip,
    Paper,
    Stack
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import AttachmentButton from "./AttachmentButton";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";

function ChatInput({

    // ======================
    // Chat
    // ======================

    question,
    setQuestion,

    askQuestion,

    isStreaming,

    // ======================
    // Documents
    // ======================

    file,
    setFile,

    uploadFile,

    uploading,

    uploadSuccess

}) {

    // ==================================================
    // Send Message
    // ==================================================

    const handleSend = async () => {

        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) {

            return;

        }

        await askQuestion(trimmedQuestion);

        setQuestion("");

    };

    return (

        <Paper
            elevation={0}
            sx={{
                borderRadius: 5,
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default"
            }}
        >

            {/* ========================================= */}
            {/* Selected File */}
            {/* ========================================= */}

            {

                file && (

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mb: 2
                        }}
                    >

                        <Chip

                            label={file.name}

                            color="primary"

                            onDelete={() =>

                                setFile(null)

                            }

                        />

                    </Stack>

                )

            }

            {/* ========================================= */}
            {/* Input Row */}
            {/* ========================================= */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 2
                }}
            >

                {/* Attachment */}

                <AttachmentButton

                    file={file}

                    setFile={setFile}

                />

                {/* Message */}

                <Box
                    sx={{
                        flex: 1
                    }}
                >

                    <MessageInput

                        question={question}

                        setQuestion={setQuestion}

                        isStreaming={isStreaming}

                        onSend={handleSend}

                    />

                </Box>

                {/* Send */}

                <SendButton

                    isStreaming={isStreaming}

                    onSend={handleSend}

                />

            </Box>

            {/* ========================================= */}
            {/* Upload Button */}
            {/* ========================================= */}

            {

                file && (

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2
                        }}
                    >

                        <Button

                            variant="contained"

                            startIcon={<CloudUploadIcon />}

                            onClick={uploadFile}

                            disabled={uploading}

                        >

                            {

                                uploading

                                    ? "Uploading..."

                                    : "Upload Document"

                            }

                        </Button>

                    </Box>

                )

            }

            {/* ========================================= */}
            {/* Upload Success */}
            {/* ========================================= */}

            {

                uploadSuccess && (

                    <Box
                        sx={{
                            mt: 2
                        }}
                    >

                        <Chip

                            color="success"

                            label="Document uploaded successfully"

                        />

                    </Box>

                )

            }

        </Paper>

    );

}

export default ChatInput;