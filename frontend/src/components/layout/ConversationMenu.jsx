import { useState } from "react";

import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

function ConversationMenu({

  anchorEl,

  open,

  onClose,

  conversation,

  renameConversation,

  deleteConversation,

  togglePinConversation

}) {

  const [renameOpen, setRenameOpen] = useState(false);

  const [title, setTitle] = useState(conversation?.title || "");

  const handleRename = () => {

    if (!title.trim()) return;

    renameConversation(

      conversation.id,

      title

    );

    setRenameOpen(false);

    onClose();

  };

  return (

    <>

      <Menu

        anchorEl={anchorEl}

        open={open}

        onClose={onClose}

      >

        {/* Rename */}

        <MenuItem

          onClick={() => {

            setRenameOpen(true);

          }}

        >

          <ListItemIcon>

            <EditIcon fontSize="small" />

          </ListItemIcon>

          <ListItemText>

            Rename

          </ListItemText>

        </MenuItem>

        {/* Pin */}

        <MenuItem

          onClick={() => {

            togglePinConversation(

              conversation.id

            );

            onClose();

          }}

        >

          <ListItemIcon>

            {

              conversation.pinned

                ?

                <PushPinIcon fontSize="small" />

                :

                <PushPinOutlinedIcon fontSize="small" />

            }

          </ListItemIcon>

          <ListItemText>

            {

              conversation.pinned

                ? "Unpin"

                : "Pin"

            }

          </ListItemText>

        </MenuItem>

        {/* Delete */}

        <MenuItem

          onClick={() => {

            deleteConversation(

              conversation.id

            );

            onClose();

          }}

        >

          <ListItemIcon>

            <DeleteIcon

              fontSize="small"

              color="error"

            />

          </ListItemIcon>

          <ListItemText>

            Delete

          </ListItemText>

        </MenuItem>

      </Menu>

      {/* Rename Dialog */}

      <Dialog

        open={renameOpen}

        onClose={() =>

          setRenameOpen(false)

        }

      >

        <DialogTitle>

          Rename Conversation

        </DialogTitle>

        <DialogContent>

          <TextField

            autoFocus

            fullWidth

            margin="dense"

            label="Conversation Name"

            value={title}

            onChange={(event) =>

              setTitle(event.target.value)

            }

          />

        </DialogContent>

        <DialogActions>

          <Button

            onClick={() =>

              setRenameOpen(false)

            }

          >

            Cancel

          </Button>

          <Button

            variant="contained"

            onClick={handleRename}

          >

            Save

          </Button>

        </DialogActions>

      </Dialog>

    </>

  );

}

export default ConversationMenu;