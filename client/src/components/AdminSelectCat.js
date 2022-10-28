import React, {useState} from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import  MenuItem  from '@mui/material/MenuItem';
import  Typography  from '@mui/material/Typography';
import CatForm from '../forms/CatForm';
import useCategories from '../hooks/useCategories';
import Error from './Error';
// const categories = [{id:2, name:"Calming"},{id:4, name:"Energy"},{id:5, "name":"Healing"}]

export default function AdminSelectCat() {
    const [cat, setCat] = useState('')
    const {categories, error} = useCategories()

    const handleChange=(event)=>{
        console.log(event.target.value)
        if(event.target.value === 'default'){
            console.log("No Cat Selected")
            setCat('')

        }else{
            const newcat = categories.filter((c)=>c.id===event.target.value)[0]
            console.log("Cat Selected", newcat)
            setCat(newcat)

        }

    }

  return (<>
    <FormControl fullWidth>
        <InputLabel id="category-label-id">Category</InputLabel>
        <Error>{error}</Error>
        <Select
            labelId="category-label-id"
            id="category-id"
            name="category_id"
            value={cat ? cat.id : 'default'}
            placeholder="Category"
            label="Category"
            onChange={(event)=>handleChange(event)}
        >
            <MenuItem  value={"default"}><em>Select Category to Edit</em></MenuItem>
            {
                categories?.map((cat1)=>(
                    <MenuItem key={cat1.id} value={cat1.id}>{cat1.name}</MenuItem>
                ))
            }

        </Select>
    </FormControl>
    {
        cat ?
        <>
        <Typography sx={{p:4}} variant="h5">
            Edit {cat.name}
        </Typography>
        <CatForm category={cat}/> 
        </>
        :
        <>
        <Typography sx={{p:4}} variant="h5">
            Create
        </Typography>
        <CatForm/>
        </>
    }
  </>

  )
}
