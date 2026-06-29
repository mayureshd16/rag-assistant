import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useState } from "react";

import SourceCard from "./SourceCard";

function MessageSources({

  sources = []

}) {

  const [expanded, setExpanded] = useState(false);

  if (!sources.length) {

    return null;

  }

  return (

    <>

      <Divider sx={{ my: 2 }} />

      <Box

        sx={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          mb: 1

        }}

      >

        <Typography

          fontWeight="bold"

        >

          📚 Sources Used ({sources.length})

        </Typography>

        <Tooltip

          title={

            expanded

              ? "Hide Sources"

              : "Show Sources"

          }

        >

          <IconButton

            onClick={() =>

              setExpanded(!expanded)

            }

          >

            {

              expanded

                ?

                <ExpandLessIcon />

                :

                <ExpandMoreIcon />

            }

          </IconButton>

        </Tooltip>

      </Box>

      <Collapse

        in={expanded}

      >

        {

          sources.map((source, index) => (

            <SourceCard

              key={index}

              source={source}

              index={index}

            />

          ))

        }

      </Collapse>

    </>

  );

}

export default MessageSources;