import { Box } from "@mui/material";

import MessageBubble from "../message/MessageBubble";

function Conversation({

  messages

}) {

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >

      {

        messages.map(message => (

          <MessageBubble

            key={message.id}

            message={message}

          />

        ))

      }

    </Box>

  );

}

export default Conversation;