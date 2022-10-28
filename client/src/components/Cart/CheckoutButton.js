import React, { useState, useContext, useEffect } from 'react'
import Button from '../Button'
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import { AppContext } from '../../context/AppContext';
import postTransaction from '../../api/apiStripe';
import {CancelToken} from 'apisauce'

export default function CheckoutButton({children}) {

    const {user, cart} = useContext(AppContext)
    const [checkoutInfo, setCheckoutInfo] = useState()

    useEffect(()=>{
        let source
        const makeSale=async()=>{
           source = CancelToken.source() 
           if(checkoutInfo){
                await postTransaction(user.token, checkoutInfo, source.token)
           }
        }
  
        makeSale()
        
        return ()=>{source.cancel()}
    },[checkoutInfo, user.token])

  return (
    <Button onClick={()=>{setCheckoutInfo({cart, user})}} startIcon={<PointOfSaleTwoToneIcon/>}>{children}</Button>
  )
}
