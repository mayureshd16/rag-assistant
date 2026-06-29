import {
  Box,
  Typography
} from "@mui/material";

function MessageHeader({

  isUser,

  timestamp

}) {

  return (

    <Box
      sx={{

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        mb: 2

      }}
    >

      <Typography
        fontWeight="bold"
      >

        {

          isUser

            ? "You"

            : "Assistant"

        }

      </Typography>

      <Typography
        variant="caption"
        color={

          isUser

            ? "rgba(255,255,255,.8)"

            : "text.secondary"

        }
      >

        {timestamp}

      </Typography>

    </Box>

  );

}

export default MessageHeader;