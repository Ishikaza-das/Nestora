import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UserContext } from '@/context/UserContext'
import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProfileCircle = () => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }
  return (
    <Popover>
        <PopoverTrigger asChild>
            <button>
                <Avatar className="cursor-pointer">
                    <AvatarImage className="object-cover" src={user?.profilePic || "https://github.com/shadcn.png"}/>
                </Avatar>
            </button>
        </PopoverTrigger>

        <PopoverContent className="w-48">
            <div className='flex flex-col items-start space-y-3 text-gray-300'>
                <Button variant="link">
                    <Link to="/profile">View Profile</Link>
                </Button>

                <Button variant="link" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ProfileCircle