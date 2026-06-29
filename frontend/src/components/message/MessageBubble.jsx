import {
  Avatar,
  Box,
  Fade,
  Paper
} from "@mui/material";

import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import MessageActions from "./MessageActions";
import MessageSources from "./MessageSources";

function MessageBubble({ message }) {

  const {

    type,

    text,

    timestamp,

    sources = []

  } = message;

  const isUser = type === "user";

  return (

    <Fade

      in

      timeout={350}

    >

      <Box

        sx={{

          display: "flex",

          justifyContent:

            isUser

              ? "flex-end"

              : "flex-start",

          mb: 2.5

        }}

      >

        <Box

          sx={{

            display: "flex",

            flexDirection:

              isUser

                ? "row-reverse"

                : "row",

            alignItems: "flex-start",

            gap: 2,

            maxWidth: {

              xs: "100%",

              sm: "90%",

              md: "75%"

            }

          }}

        >

          <Avatar

            sx={{

              bgcolor:

                isUser

                  ? "primary.main"

                  : "success.main"

            }}

          >

            {

              isUser

                ? "👤"

                : "🤖"

            }

          </Avatar>

          <Paper

            elevation={3}

            sx={{

              p: 2.5,

              borderRadius: 3,

              bgcolor:

                isUser

                  ? "primary.main"

                  : "background.paper",

              color:

                isUser

                  ? "white"

                  : "text.primary",

              transition: ".25s"

            }}

          >

            {/* Header */}

            <MessageHeader

              isUser={isUser}

              timestamp={timestamp}

            />

            {/* Content */}

            <MessageContent

              text={text}

              isUser={isUser}

            />

            {/* Assistant Only */}

            {

              !isUser &&

              <>

                <MessageActions

                  text={text}

                />

                <MessageSources

                  sources={sources}

                />

              </>

            }

          </Paper>

        </Box>

      </Box>

    </Fade>

  );

}

export default MessageBubble;