import React, { useState } from "react";

export default function ChatAssistButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsChatOpen((p) => !p);
        }}
      >
        Open chat
      </button>
    </>
  );
}
