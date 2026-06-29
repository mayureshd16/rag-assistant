import {

  useEffect,

  useRef

} from "react";

import {

  Box

} from "@mui/material";

import Conversation from "./Conversation";
import EmptyChat from "./EmptyChat";
import TypingBubble from "./TypingBubble";

function ChatHistory({

  chatHistory,

  loading

}) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [

    chatHistory,

    loading

  ]);

  if (!chatHistory?.length && !loading) {

    return <EmptyChat />;

  }

  return (

    <Box>

      <Conversation

        messages={chatHistory}

      />

      {

        loading &&

        <TypingBubble />

      }

      <div ref={bottomRef} />

    </Box>

  );

}

export default ChatHistory;