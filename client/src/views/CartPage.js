import { Typography } from '@mui/material'
import React, {useContext, useEffect} from 'react'
import Cart from '../components/Cart/Index'
import {useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function CartPage() {
  const {setAlert, cart} = useContext(AppContext)

  const {canceled} = useParams()

  useEffect(()=>{
    if(canceled){
      setAlert({msg:"Checkout Canceled", cat:"error"})
    }
  },[canceled, setAlert])

  if (cart.length <= 0){
    return <Typography variant="h3">Your Cart is Empty</Typography>

  }

  return (
      <>
        <Typography variant="h3">Your Cart</Typography>
        <Cart/>
      </>  
  )
}
