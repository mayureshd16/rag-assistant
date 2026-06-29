import {
  Box,
  Typography
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

function EmptyChat() {

  return (

    <Box

      sx={{

        height: "100%",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        color: "text.secondary",

        textAlign: "center"

      }}

    >

      <SmartToyIcon

        sx={{

          fontSize: 80,

          mb: 2,

          color: "primary.main"

        }}

      />

      <Typography

        variant="h4"

        fontWeight="bold"

      >

        Welcome

      </Typography>

      <Typography

        sx={{

          mt: 2,

          maxWidth: 500

        }}

      >

        Upload a document and ask anything.

        Your conversations will appear here.

      </Typography>

    </Box>

  );

}

export default EmptyChat;