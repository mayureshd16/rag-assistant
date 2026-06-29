import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Box
} from "@mui/material";

function MessageContent({

  text,

  isUser

}) {

  return (

    <Box

      sx={{

        "& p": {

          marginTop: 0,

          marginBottom: 1.5,

          lineHeight: 1.8

        },

        "& ul": {

          pl: 3,

          mb: 2

        },

        "& ol": {

          pl: 3,

          mb: 2

        },

        "& li": {

          mb: 0.5

        },

        "& pre": {

          overflowX: "auto",

          p: 2,

          borderRadius: 2,

          bgcolor:

            isUser

              ? "rgba(255,255,255,.15)"

              : "grey.100"

        },

        "& code": {

          fontFamily: "Consolas, monospace",

          fontSize: "0.9rem"

        },

        "& table": {

          width: "100%",

          borderCollapse: "collapse",

          mt: 2,

          mb: 2

        },

        "& th, & td": {

          border: "1px solid",

          borderColor: "divider",

          p: 1

        },

        "& th": {

          bgcolor:

            isUser

              ? "rgba(255,255,255,.15)"

              : "grey.200"

        },

        "& a": {

          color:

            isUser

              ? "#fff"

              : "primary.main",

          fontWeight: 600

        }

      }}

    >

      <ReactMarkdown

        remarkPlugins={[remarkGfm]}

      >

        {text}

      </ReactMarkdown>

    </Box>

  );

}

export default MessageContent;