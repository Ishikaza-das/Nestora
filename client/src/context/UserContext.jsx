import { socket } from "@/utils/Socket";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_AUTH_API}/logout`,{withCredentials:true});
            if(response.data.success){
                setUser(null);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_USER_API}/getMe`,{withCredentials: true});
                if(response.data.success){
                    setUser(response.data.user);
                    console.log("context user",response.data.user);
                }
            } catch (error) {
                console.log("Auth fail",error)
                setUser(null);
            } finally{
                setLoading(false)
            }
        }
        checkUser();
    },[])

    useEffect(() => {
    if (user?._id) {
        socket.emit("register_user", user._id);
    }
}, [user]);

    return (
        <UserContext.Provider value={{user, setUser, logout, loading}}>
            {children}
        </UserContext.Provider>
    )
}