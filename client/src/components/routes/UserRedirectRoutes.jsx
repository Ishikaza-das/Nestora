import { UserContext } from '@/context/UserContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

const UserRedirectRoutes = ({ children}) => {
    const { user } = useContext(UserContext);

    if(user){
        return <Navigate to="/home" replace/>
    }
  return children
}

export default UserRedirectRoutes
