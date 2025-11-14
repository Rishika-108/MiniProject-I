import { useState } from "react";
import { useChat } from "../hooks/useChat";
import Message from "./Message";

const ChatBox = ({ email }) => {
  const [input, setInput] = useState("");
  const { messages, addMessage } = useChat(email);

  const handleSend = async () => {
    if (!input) return;
    await addMessage(input);
    setInput("");
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, i) => <Message key={i} author={msg.author} content={msg.content} />)}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
