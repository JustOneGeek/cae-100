import Box from '@mui/material/Box'
import CartItem from './CartItem'
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import CheckoutBar from './CheckoutBar';

export default function Index(){
    const {cart} = useContext(AppContext)


      return (
          <>
            <Box sx={{mb:5, maxWidth:"75%", mx:"auto"}}>
                {
                    [...new Set(cart?.map(JSON.stringify))]?.map(JSON.parse)?.map(
                        (item)=><CartItem key={item.id} item={item}/>
                        )
                }
            </Box>
            <CheckoutBar/>
          </>
      )
}