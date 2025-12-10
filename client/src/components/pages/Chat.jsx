import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ChatList from "./components/ChatList";
import Conversation from "./components/Conversation";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import Navbar from "../shared/Navbar";

const Chat = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [activeChat, setActiveChat] = useState(null);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initConversation = async () => {
      const ownerId = location.state?.ownerId;
      if (!ownerId || !user?._id) return;

      try {
        const res = await axios.post(`${import.meta.env.VITE_CHAT_API}/conversation`, {
          userId: user._id,
          ownerId,
        });

        if (res.data.success) {
          setActiveChat(res.data.conversation);
        }
      } catch (err) {
        console.log(err);
      }
    };

    initConversation();
  }, [location.state, user]);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <Navbar />

      {!isMobileView && (
        <div className="grid grid-cols-4 h-[90vh] border rounded-lg overflow-hidden">
          <div className="col-span-1 border-r bg-white">
            <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
          </div>

          <div className="col-span-3 bg-gray-50">
            {activeChat ? (
              <Conversation chat={activeChat} setActiveChat={setActiveChat} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                📭 Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      )}

      {isMobileView && (
        <div className="h-[90vh] border rounded-lg overflow-hidden">
          {!activeChat && (
            <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
          )}

          {activeChat && (
            <Conversation
              chat={activeChat}
              setActiveChat={setActiveChat} 
              isMobile={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;
