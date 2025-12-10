import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "@/utils/Socket";

const Conversation = ({ chat, isMobile, setActiveChat }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!chat?._id) return;

    const loadMessages = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_CHAT_API}/messages/${chat._id}`
      );
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    };

    loadMessages();

    socket.emit("join_conversation", chat._id);
  }, [chat]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const msgData = {
      conversationId: chat._id,
      sender: user._id,
      text: newMessage,
    };

    await axios.post(`${import.meta.env.VITE_CHAT_API}/message`, msgData);

    socket.emit("send_message", msgData);

    setMessages((prev) => [...prev, msgData]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div className="p-3 border-b bg-white">
          <button
            className="text-yellow-600 font-medium"
            onClick={() => setActiveChat(null)}
          >
            ← Back
          </button>
          <p className="font-semibold text-gray-700">
            {chat?.participants?.find((p) => p._id !== user._id)?.name}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Start the conversation 👋
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-md ${
              msg.sender === user._id
                ? "ml-auto bg-yellow-500 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}

        <div ref={messageEndRef}></div>
      </div>

      <div className="p-3 border-t flex gap-2 mb-4">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button
          onClick={sendMessage}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Conversation;
