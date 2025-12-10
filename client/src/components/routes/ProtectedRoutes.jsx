import { UserContext } from '@/context/UserContext'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user, loading} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && user === null){
            navigate('/login');
        }
    },[user,loading,navigate])
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoutes
