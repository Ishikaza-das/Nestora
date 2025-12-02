import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

const ChangePassword = () => {
    const{setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        oldPassword:"",
        newPassword:""
    })

    const handelInputChange = (e) => {
        setInput({...input,[e.target.id]: e.target.value});
    }

    const handelPasswordChange = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("oldPassword",input.oldPassword)
        formData.append("newPassword",input.newPassword);
        try {
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_USER_API}/update-pass`,formData,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials: true
            })
            if(response.data.success){
                setUser(response.data.user);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <h1 className='font-semibold text-xl'>Change Password</h1>
      <form action="" className='mt-4 space-y-2' onSubmit={handelPasswordChange}>
        <div className="space-y-1">
              <Label htmlFor="oldPassword" className="text-sm font-medium">
                Old Password
              </Label>
              <Input id="oldPassword" type="text" value={input.oldPassword} onChange={handelInputChange}/>
        </div>

        <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </Label>
              <Input id="newPassword" type="text" value={input.newPassword} onChange={handelInputChange}/>
        </div>
        {
          loading ? <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit"><Loader2 className="animate-spin h-4 w-4 mr-2"/></Button> : <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit">Save</Button>
        }
      </form>
    </div>
  )
}

export default ChangePassword
