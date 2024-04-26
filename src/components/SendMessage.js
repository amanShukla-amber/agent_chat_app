import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { property1, userProfileIcon } from "../utils";

const SendMessage = ({
  scroll,
  runChat,
  setIsAgentConnected,
  isAgentConnected,
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    if (isAgentConnected) {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: "Aman Shukla",
        avatar: userProfileIcon,
        createdAt: serverTimestamp(),
        uid: "user",
      });
    } else {
      runChat(message, property1);
    }

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const onClickConnect = () => {
    console.log("clicked");
    setIsAgentConnected(true);
  };

  console.log(":isAgentConnected", isAgentConnected);
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
      <button
        disabled={isAgentConnected}
        type="button"
        onClick={onClickConnect}
      >
        Connect to agent
      </button>
    </form>
  );
};

export default SendMessage;
