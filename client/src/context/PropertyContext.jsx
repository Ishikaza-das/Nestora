import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [userProperty, setUserProperty] = useState([]);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PROPERTY_API}/user`,{
                withCredentials:true
            })
            if(response.data.success){
                setUserProperty(response.data.properties)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProperty();
    },[]);

    const refreshProperty = async () => {
        await fetchProperty();
    }
  return (
    <PropertyContext.Provider value={{ userProperty, refreshProperty}}>
      {children}
    </PropertyContext.Provider>
  )
}