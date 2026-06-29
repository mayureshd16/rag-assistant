import {

    Box,

    Paper,

    Avatar,

    CircularProgress

} from "@mui/material";

function TypingBubble() {

    return (

        <Box

            sx={{

                display:"flex",

                gap:2,

                mb:3

            }}

        >

            <Avatar

                sx={{

                    bgcolor:"success.main"

                }}

            >

                🤖

            </Avatar>

            <Paper

                sx={{

                    p:2,

                    borderRadius:3,

                    display:"flex",

                    alignItems:"center",

                    gap:2

                }}

            >

                <CircularProgress

                    size={18}

                />

                Thinking...

            </Paper>

        </Box>

    );

}

export default TypingBubble;