import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { botProfileIcon, userProfileIcon } from "../utils";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const scroll = useRef();

  const pushMessage = (msg) => {
    setMessages((p) => [...p, msg]);
  };

  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyDpyPSpPnvSvagxATasTSeC-stlIyPKwpg";

  async function runChat(userInput, propertDetail) {
    pushMessage({
      uid: "user",
      text: userInput,
      name: "Aman Shukla",
      avatar: userProfileIcon,
      createdAt: serverTimestamp(),
    });
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 500,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: propertDetail,
    });
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    pushMessage({
      uid: "bot",
      text: response.text(),
      name: "Amber-bot",
      avatar: botProfileIcon,
      createdAt: serverTimestamp(),
    });
    return response.text();
  }

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage
        scroll={scroll}
        runChat={runChat}
        setIsAgentConnected={setIsAgentConnected}
        isAgentConnected={isAgentConnected}
      />
    </main>
  );
};

export default ChatBox;
