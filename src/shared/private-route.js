import React from 'react'
import { Navigate } from 'react-router-dom'


export default function PrivateRoute({children, isAuth}) {

  if(isAuth){
    return children
  } else {
    return <Navigate to="/login" />
  }

}
