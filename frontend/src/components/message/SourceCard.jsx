import { useState } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Snackbar
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { copyToClipboard } from "../../utils/clipboard";

function SourceCard({ source }) {

  const metadata = source.metadata || {};

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {

    const success = await copyToClipboard(source.content);

    if (success) {

      setCopied(true);

    }

  };

  return (

    <>

      <Accordion

        disableGutters

        elevation={0}

        sx={{

          mb: 2,

          border: "1px solid",

          borderColor: "divider",

          borderRadius: 2,

          overflow: "hidden",

          "&:before": {

            display: "none"

          }

        }}

      >

        <AccordionSummary

          expandIcon={<ExpandMoreIcon />}

        >

          <Box

            sx={{

              width: "100%"

            }}

          >

            <Box

              sx={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center"

              }}

            >

              <Typography

                fontWeight="bold"

              >

                <DescriptionIcon

                  fontSize="small"

                  sx={{

                    mr: 1,

                    verticalAlign: "middle"

                  }}

                />

                {metadata.filename || "Unknown Document"}

              </Typography>

              <Tooltip title="Copy Chunk">

                <IconButton

                  size="small"

                  onClick={(event) => {

                    event.stopPropagation();

                    handleCopy();

                  }}

                >

                  <ContentCopyIcon fontSize="small" />

                </IconButton>

              </Tooltip>

            </Box>

            <Box

              sx={{

                display: "flex",

                gap: 1,

                mt: 1,

                flexWrap: "wrap"

              }}

            >

              <Chip

                size="small"

                color="primary"

                label={`Page ${metadata.page ?? "-"}`}

              />

              {

                metadata.uploaded_at &&

                <Chip

                  size="small"

                  color="success"

                  label={metadata.uploaded_at}

                />

              }

            </Box>

          </Box>

        </AccordionSummary>

        <AccordionDetails>

          <Divider

            sx={{

              mb: 2

            }}

          />

          <Typography

            sx={{

              whiteSpace: "pre-wrap",

              lineHeight: 1.8,

              fontSize: "0.95rem"

            }}

          >

            {source.content}

          </Typography>

        </AccordionDetails>

      </Accordion>

      <Snackbar

        open={copied}

        autoHideDuration={2000}

        onClose={() =>

          setCopied(false)

        }

        message="Source copied"

      />

    </>

  );

}

export default SourceCard;