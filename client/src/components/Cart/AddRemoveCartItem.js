import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

export default function AddRemoveCartItem({item}) {
  const {addToCart, removeFromCart, removeAllFromCart} = useContext(AppContext)
  return (
    <ButtonGroup sx={{margin:"auto"}}>
        <IconButton key="delete" onClick={()=>{console.log('delete all of ',item.name); removeAllFromCart(item)}}>
          <DeleteForeverTwoToneIcon fontSize="small"/>
        </IconButton>
        <IconButton key="rm" onClick={()=>{console.log('remove 1 of this item',item.name); removeFromCart(item) }}>
          <RemoveCircleTwoToneIcon fontSize="small"/>
        </IconButton>
        <IconButton key="add" onClick={()=>{console.log('add 1 more of this item',item.name); addToCart(item)}}>
          <AddCircleTwoToneIcon fontSize="small"/>
        </IconButton>
    </ButtonGroup>
  )
}
