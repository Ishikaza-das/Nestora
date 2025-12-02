import { Dialog, DialogContent } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import UpdateUser from './UpdateUser';
import ChangePassword from './ChangePassword';

const UpdateOption = ({ open, setOpen }) => {
  const [activeDialog, setActiveDialog] = useState(null);

  const handelDelete = async () => {
    
  }

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
            onClick={() => {
              setActiveDialog("changePassword");
              setOpen(false);
            }}
            variant="outline"
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
          >
            Delete Account
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "updateUser"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <UpdateUser/>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "changePassword"} onOpenChange={() => setActiveDialog(null)}>
        <DialogContent>
          <ChangePassword/>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateOption
