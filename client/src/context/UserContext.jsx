import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}