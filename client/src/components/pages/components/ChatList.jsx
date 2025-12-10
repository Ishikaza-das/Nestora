import React, { useEffect, useState, useContext } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ChatList = ({ setActiveChat, activeChat }) => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_CHAT_API}/conversations/${user._id}`
        );
        if (res.data.success) {
          let conversations = res.data.conversations;
          const seen = new Set();
          conversations = conversations.filter((conv) => {
            const otherUser = conv.participants.find(
              (p) => p._id !== user._id
            );
            if (!otherUser) return false;
            if (seen.has(otherUser._id)) return false;
            seen.add(otherUser._id);
            return true;
          });

          setChats(conversations);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <ScrollArea className="h-full">
      <h2 className="text-xl font-semibold p-4">Chats</h2>

      {chats.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <p className="text-lg">🗨️ No chats yet</p>
          <p className="text-sm">Start messaging owners to see them here</p>
        </div>
      ) : (
        chats.map((chat) => {
          const otherUser = chat.participants.find((p) => p._id !== user._id);

          return (
            <div
              key={chat._id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-4 p-4 cursor-pointer border-b hover:bg-gray-100 transition
                ${activeChat?._id === chat._id ? "bg-gray-100" : ""}`}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={otherUser?.profilePic} alt={otherUser?.name} />
                <AvatarFallback>
                  {otherUser?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{otherUser?.name}</h3>
                <p className="text-sm text-gray-600">Tap to view conversation</p>
              </div>
            </div>
          );
        })
      )}
    </ScrollArea>
  );
};

export default ChatList;
