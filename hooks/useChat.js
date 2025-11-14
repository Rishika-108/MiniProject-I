import { useState, useEffect } from "react";
import { getHistory, sendMessage } from "../services/api";

export const useChat = (email) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory(email);
      setMessages(data.history || []);
    };
    fetchHistory();
  }, [email]);

  const addMessage = async (message) => {
    const data = await sendMessage(email, message);
    setMessages([...messages, { author: "user", content: message }, { author: "bot", content: data.reply }]);
  };

  return { messages, addMessage };
};
