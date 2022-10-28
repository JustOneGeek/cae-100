
import React, {useContext, useEffect} from 'react'
import {Navigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function LogOut() {
    const {setUser} = useContext(AppContext)
    
    useEffect(()=>{setUser('')},[setUser])

  return (
    <Navigate to='/login' />
  )
}
