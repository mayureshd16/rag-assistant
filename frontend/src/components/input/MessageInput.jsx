import { TextField } from "@mui/material";

function MessageInput({

    question,

    setQuestion,

    isStreaming,

    onSend

}) {

    const handleKeyDown = (event) => {

        if (

            event.key === "Enter" &&

            !event.shiftKey

        ) {

            event.preventDefault();

            onSend();

        }

    };

    return (

        <TextField

            fullWidth

            multiline

            minRows={1}

            maxRows={6}

            placeholder="Ask anything about your uploaded documents..."

            value={question}

            disabled={isStreaming}

            onChange={(event) =>

                setQuestion(event.target.value)

            }

            onKeyDown={handleKeyDown}

            variant="outlined"

            sx={{

                "& .MuiOutlinedInput-root": {

                    borderRadius: 5,

                    bgcolor: "background.paper"

                }

            }}

        />

    );

}

export default MessageInput;