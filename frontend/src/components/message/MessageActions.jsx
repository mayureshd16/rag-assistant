import { useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Snackbar
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import ShareIcon from "@mui/icons-material/Share";

import { copyToClipboard } from "../../utils/clipboard";

function MessageActions({

  text,

  onRegenerate

}) {

  const [liked, setLiked] = useState(false);

  const [disliked, setDisliked] = useState(false);

  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {

    const success = await copyToClipboard(text);

    if (success) {

      setCopied(true);

    }

  };

  return (

    <>

      <Divider sx={{ my: 2 }} />

      <Box

        sx={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center"

        }}

      >

        <Box>

          {/* Copy */}

          <Tooltip title="Copy">

            <IconButton

              onClick={copyMessage}

            >

              <ContentCopyIcon />

            </IconButton>

          </Tooltip>

          {/* Like */}

          <Tooltip title="Helpful">

            <IconButton

              color={

                liked

                  ? "primary"

                  : "default"

              }

              onClick={() => {

                setLiked(!liked);

                if (!liked)

                  setDisliked(false);

              }}

            >

              <ThumbUpAltOutlinedIcon />

            </IconButton>

          </Tooltip>

          {/* Dislike */}

          <Tooltip title="Not Helpful">

            <IconButton

              color={

                disliked

                  ? "error"

                  : "default"

              }

              onClick={() => {

                setDisliked(!disliked);

                if (!disliked)

                  setLiked(false);

              }}

            >

              <ThumbDownAltOutlinedIcon />

            </IconButton>

          </Tooltip>

          {/* Regenerate */}

          <Tooltip title="Regenerate (Coming Soon)">

            <span>

              <IconButton

                disabled={!onRegenerate}

                onClick={onRegenerate}

              >

                <ReplayIcon />

              </IconButton>

            </span>

          </Tooltip>

          {/* Share */}

          <Tooltip title="Share (Coming Soon)">

            <span>

              <IconButton disabled>

                <ShareIcon />

              </IconButton>

            </span>

          </Tooltip>

        </Box>

      </Box>

      <Snackbar

        open={copied}

        autoHideDuration={2000}

        onClose={() =>

          setCopied(false)

        }

        message="Copied to clipboard"

      />

    </>

  );

}

export default MessageActions;