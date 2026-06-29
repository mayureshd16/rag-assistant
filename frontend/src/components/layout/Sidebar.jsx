import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Divider,
  List,
  Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";

import ConversationSearch from "./ConversationSearch";
import ConversationItem from "./ConversationItem";
import ThemeToggle from "./ThemeToggle";

function Sidebar({

  conversations,

  selectedConversation,

  setSelectedConversation,

  createConversation,

  renameConversation,

  deleteConversation,

  togglePinConversation,

  mode,

  setMode

}) {

  const [search, setSearch] = useState("");

  // ==========================
  // Filter Conversations
  // ==========================

  const filteredConversations = useMemo(() => {

    const keyword = search.toLowerCase();

    return conversations.filter(conversation =>

      conversation.title

        .toLowerCase()

        .includes(keyword)

    );

  }, [

    conversations,

    search

  ]);

  // ==========================
  // Sort Conversations
  // ==========================

  const sortedConversations = useMemo(() => {

    return [...filteredConversations]

      .sort((a, b) => {

        if (a.pinned !== b.pinned) {

          return b.pinned - a.pinned;

        }

        return new Date(b.updatedAt) -

          new Date(a.updatedAt);

      });

  }, [

    filteredConversations

  ]);

  return (

    <Box

      sx={{

        width: 320,

        height: "100vh",

        borderRight: "1px solid",

        borderColor: "divider",

        display: "flex",

        flexDirection: "column",

        bgcolor: "background.paper"

      }}

    >

      {/* ================= Header ================= */}

      <Box

        sx={{

          p: 3

        }}

      >

        <Typography

          variant="h5"

          fontWeight="bold"

        >

          🤖 RAG Assistant

        </Typography>

      </Box>

      <Divider />

      {/* ================= New Chat ================= */}

      <Box

        sx={{

          p: 2

        }}

      >

        <Button

          fullWidth

          variant="contained"

          startIcon={<AddIcon />}

          onClick={() =>

            createConversation()

          }

        >

          New Chat

        </Button>

      </Box>

      {/* ================= Search ================= */}

      <Box

        sx={{

          px: 2

        }}

      >

        <ConversationSearch

          search={search}

          setSearch={setSearch}

        />

      </Box>

      <Divider />

      {/* ================= Conversations ================= */}

      <Box

        sx={{

          flex: 1,

          overflowY: "auto",

          px: 1,

          py: 2

        }}

      >

        {

          sortedConversations.length === 0

            ?

            (

              <Box

                sx={{

                  mt: 8,

                  textAlign: "center",

                  color: "text.secondary"

                }}

              >

                <ChatBubbleOutlinedIcon

                  sx={{

                    fontSize: 50,

                    mb: 2

                  }}

                />

                <Typography>

                  No Conversations

                </Typography>

                <Typography

                  variant="body2"

                >

                  Start a new chat to begin.

                </Typography>

              </Box>

            )

            :

            (

              <List>

                {

                  sortedConversations.map(

                    conversation => (

                      <ConversationItem

                        key={conversation.id}

                        conversation={conversation}

                        selectedConversation={selectedConversation}

                        setSelectedConversation={setSelectedConversation}

                        renameConversation={renameConversation}

                        deleteConversation={deleteConversation}

                        togglePinConversation={togglePinConversation}

                      />

                    )

                  )

                }

              </List>

            )

        }

      </Box>

      <Divider />

      {/* ================= Footer ================= */}

      <Box

        sx={{

          p: 2

        }}

      >

        <ThemeToggle

          mode={mode}

          setMode={setMode}

        />

      </Box>

    </Box>

  );

}

export default Sidebar;