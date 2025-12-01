import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const UpdateUser = () => {
    const [input, setInput] = useState({
        name:"",
        email:"",
        phone:""
    })

    const handelInputChnage = (e) => {
        setInput({...input,[e.target.id]: e.target.value});
    }
  return (
    <div>
      <h1 className='font-semibold text-xl'>Update User</h1>
      <form action="" className='mt-4'>
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
              <Input id="name" type="text" value={input.email} onChange={handelInputChnage}/>
        </div>

        <div className="space-y-1">
              <Label htmlFor="profile" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input id="name" type="text" value={input.phone} onChange={handelInputChnage}/>
        </div>

        <Button className="mt-4 w-full bg-amber-300 text-black hover:bg-amber-400">Update</Button>
      </form>
    </div>
  )
}

export default UpdateUser
