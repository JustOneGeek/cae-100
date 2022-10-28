import React, {useState} from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import ItemForm from '../forms/ItemForm';
import useItems from '../hooks/useItems';
// const items=[{
//     "id":4,
//     "name":"itemA",
//     "desc":"itemA is good",
//     "price":9.99,
//     "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//     "category_id":2,
//     "category_name":'Calming'
//   },{
//     "id":5,
//     "name":"itemA",
//     "desc":"itemA is good",
//     "price":9.99,
//     "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//     "category_id":2,
//     "category_name":'Calming'
//   }]

export default function AdminSelectItem() {
    const {error, items} = useItems()
    const [item, setItem] = useState('')

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value === 'default'){
            console.log("No Item Selected")
            setItem('')

        }else{
            const newitem = items.filter((i)=>i.id===event.target.value)[0]
            console.log("Item Selected", newitem)
            setItem(newitem)

        }

    }

  return (<>
    <FormControl fullWidth>
        <InputLabel id="item-label-id">Item</InputLabel>
        <Select
            labelId="item-label-id"
            id="item-id"
            name="item_id"
            value={item ? item.id : 'default'}
            placeholder="Item"
            label="Item"
            onChange={(event)=>handleChange(event)}
        >
            <MenuItem  value={"default"}><em>Select Item to Edit</em></MenuItem>
            {
                items?.map((i)=>(
                    <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                ))
            }

        </Select>
    </FormControl>
    {
        item ?
        <>
        <Typography sx={{p:4}} variant="h5">
            Edit {item.name}
        </Typography>
        <ItemForm item={item}/> 
        </>
        :
        <>
        <Typography sx={{p:4}} variant="h5">
            Create
        </Typography>
        <ItemForm/>
        </>
    }
  </>

  )
}
