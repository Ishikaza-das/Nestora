import React, { useContext, useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserContext } from "@/context/UserContext";
import { Button } from "../ui/button";
import { Plus, Settings } from "lucide-react";
import UpdateOption from "./components/UpdateOption";
import { useNavigate } from "react-router-dom";
import UserPropertyTable from "./components/UserPropertyTable";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const naviagte = useNavigate();

  return (
    <>
      <Navbar />
      <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 md:p-8 flex justify-between">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 shadow-md">
              <AvatarImage src={user?.profilePic || "https://github.com/shadcn.png"} />
            </Avatar>
            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600 text-sm">{user?.email}</p>
              <p className="text-gray-600 text-sm">PhoneNumber : {user?.phone}</p>
            </div>
          </div>
          <Button className="bg-yellow-300 text-black hover:bg-yellow-400" onClick={() => setIsOpen(true)}><Settings/></Button>
        </div>
        <div className="text-right my-4">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer" onClick={() => naviagte("/app-property")}><Plus/>Add Property</Button>
        </div>
      </div>
      <div className="max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 py-4">
        <h1 className="font-bold text-lg my-5">Created Property</h1>
        <UserPropertyTable/>
      </div>
      <UpdateOption open={isOpen} setOpen={setIsOpen}/>
    </>
  );
};

export default ProfilePage;
