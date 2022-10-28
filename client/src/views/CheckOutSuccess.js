import React, { useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function CheckOutSuccess() {

  const {emptyCart} = useContext(AppContext)

    useEffect(
        ()=>{emptyCart()}
        ,
        []
    )

  return (
    <div>
        Thanks for shopping with us today<br/>
        If we sent back info from our Flask App<br/>
        We could show this hear.  Like an order Numder and / or invoice

    </div>
  )
}
