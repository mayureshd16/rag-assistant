import { useState } from "react";

import {
  Box,
  IconButton,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

import ConversationMenu from "./ConversationMenu";

function ConversationItem({

  conversation,

  selectedConversation,

  setSelectedConversation,

  renameConversation,

  deleteConversation,

  togglePinConversation

}) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {

    event.stopPropagation();

    setAnchorEl(event.currentTarget);

  };

  const handleMenuClose = () => {

    setAnchorEl(null);

  };

  return (

    <>

      <ListItemButton

        selected={

          selectedConversation === conversation.id

        }

        onClick={() =>

          setSelectedConversation(

            conversation.id

          )

        }

        sx={{

          borderRadius: 2,

          mb: 1,

          alignItems: "flex-start",

          transition: ".25s",

          "&.Mui-selected": {

            bgcolor: "action.selected"

          }

        }}

      >

        {/* Conversation Icon */}

        <ChatBubbleOutlinedIcon

          sx={{

            mr: 2,

            mt: 0.4,

            color: "text.secondary"

          }}

        />

        {/* Conversation Text */}

        <ListItemText

          primary={

            <Box

              sx={{

                display: "flex",

                alignItems: "center",

                gap: 1

              }}

            >

              {

                conversation.pinned &&

                <PushPinIcon

                  fontSize="small"

                  color="primary"

                />

              }

              <Typography

                noWrap

                fontWeight={600}

              >

                {conversation.title}

              </Typography>

            </Box>

          }

          secondary={

            <Typography

              variant="caption"

              color="text.secondary"

            >

              {conversation.updatedAt}

            </Typography>

          }

        />

        {/* Menu */}

        <Tooltip

          title="More"

        >

          <IconButton

            onClick={handleMenuOpen}

          >

            <MoreVertIcon />

          </IconButton>

        </Tooltip>

      </ListItemButton>

      <ConversationMenu

        anchorEl={anchorEl}

        open={open}

        onClose={handleMenuClose}

        conversation={conversation}

        renameConversation={renameConversation}

        deleteConversation={deleteConversation}

        togglePinConversation={togglePinConversation}

      />

    </>

  );

}

export default ConversationItem;