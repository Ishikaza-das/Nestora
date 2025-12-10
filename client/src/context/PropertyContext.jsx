import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [userProperty, setUserProperty] = useState([]);
    const [singleProperty, setSingleProperty] = useState(null);
    const [allProperty, setAllProperty] = useState(null);

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

    const fetchSingleProperty = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PROPERTY_LISTING_API}/property/${id}`,{withCredentials: true})
            if(response.data.success){
                setSingleProperty(response.data.property);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllProperty = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PROPERTY_LISTING_API}/all-properties`,{withCredentials: true});
            if(response.data.success){
                setAllProperty(response.data.properties);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <PropertyContext.Provider value={{ userProperty, refreshProperty, fetchSingleProperty, singleProperty, setSingleProperty, fetchAllProperty, allProperty}}>
      {children}
    </PropertyContext.Provider>
  )
}