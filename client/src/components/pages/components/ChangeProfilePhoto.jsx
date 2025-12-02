import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ChangeProfilePhoto = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false); 

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
        setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_USER_API}/update-profile-pic`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setUser(user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }finally{
        setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-xl">Change Profile Photo</h1>

      <div className="flex justify-center mt-3">
        <img
          src={imagePreview || user?.profilePic}
          className="h-20 w-20 rounded-full object-cover"
          alt="Profile Preview"
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <Label htmlFor="profile" className="text-sm font-medium">
            Profile Image
          </Label>
          <Input id="file" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {
          loading ? <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit"><Loader2 className="animate-spin h-4 w-4 mr-2"/></Button> : <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit">Update</Button>
        }
      </form>
    </div>
  );
};

export default ChangeProfilePhoto;
