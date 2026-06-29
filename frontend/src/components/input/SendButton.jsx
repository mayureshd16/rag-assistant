import {

    CircularProgress,

    Fab,

    Tooltip

} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

function SendButton({

    isStreaming,

    onSend

}) {

    return (

        <Tooltip title="Send">

            <Fab

                color="primary"

                size="medium"

                disabled={isStreaming}

                onClick={onSend}

            >

                {

                    isStreaming

                        ?

                        <CircularProgress

                            size={22}

                            color="inherit"

                        />

                        :

                        <SendIcon />

                }

            </Fab>

        </Tooltip>

    );

}

export default SendButton;