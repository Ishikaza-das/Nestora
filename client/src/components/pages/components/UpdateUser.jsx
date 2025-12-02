import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserContext } from '@/context/UserContext'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

const UpdateUser = () => {
  const {user, setUser} = useContext(UserContext);
    const [input, setInput] = useState({
        name:user?.name,
        email:user?.email,
        phone:user?.phone
    })
    const [loading, setLoading] = useState(false);

    const handelInputChnage = (e) => {
        setInput({...input,[e.target.id]: e.target.value});
    }

    const userUpdateHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name",input.name)
      formData.append("email",input.email)
      formData.append("phone",input.phone)
      try {
        setLoading(true);
        const response = await axios.put(`${import.meta.env.VITE_USER_API}/update-profile`,formData,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
        })
        if(response.data.success){
          setUser(response.data.updateUser);
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
      <h1 className='font-semibold text-xl'>Update User</h1>
      <form action="" className='mt-4 space-y-2' onSubmit={userUpdateHandler}>
        <div className="space-y-1">
              <Label htmlFor="profile" className="text-sm font-medium">
                Name
              </Label>
              <Input id="name" type="text" value={input.name} onChange={handelInputChnage}/>
        </div>

        <div className="space-y-1">
              <Label htmlFor="profile" className="text-sm font-medium">
                Email
              </Label>
              <Input id="email" type="email" value={input.email} onChange={handelInputChnage}/>
        </div>

        <div className="space-y-1">
              <Label htmlFor="profile" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input id="phone" type="text" value={input.phone} onChange={handelInputChnage}/>
        </div>
        {
          loading ? <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit"><Loader2 className="animate-spin h-4 w-4 mr-2"/></Button> : <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400" type="submit">Update</Button>
        }
      </form>
    </div>
  )
}

export default UpdateUser
