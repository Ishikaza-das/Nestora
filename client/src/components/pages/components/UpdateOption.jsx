import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateUser from "./UpdateUser";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const UpdateOption = ({ open, setOpen }) => {
  const { setUser } = useContext(UserContext);
  const [activeDialog, setActiveDialog] = useState(null);
  const navigate = useNavigate();

  const handelDelete = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_USER_API}/delete`,
      { withCredentials: true }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setUser(null);
      navigate("/");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col gap-4">
          <Button
            onClick={() => {
              setActiveDialog("updateUser");
              setOpen(false);
            }}
            variant="outline"
            className="bg-amber-400 hover:bg-amber-500 cursor-pointer"
          >
            Update User
          </Button>

          <Button
            onClick={() => {
              setActiveDialog("changePassword");
              setOpen(false);
            }}
            variant="outline"
            className="bg-amber-400 hover:bg-amber-500 cursor-pointer"
          >
            Change Password
          </Button>

          <Button
            onClick={handelDelete}
            variant="outline"
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
          >
            Delete Account
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "updateUser"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveDialog(null); 
        }}
      >
        <DialogContent>
          <UpdateUser />
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "changePassword"}
        onOpenChange={(isOpen) => {
          if (!isOpen) setActiveDialog(null); 
        }}
      >
        <DialogContent>
          <ChangePassword />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateOption;
