import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { CircularProgress } from '@mui/material';
import Error from './Error';
import Box from '@mui/material/Box';
import useCategories from '../hooks/useCategories';


export default function CategoryBar({actCat, setActCat}) {
  // const categories = [{id:2, name:"Calming"},{id:4, name:"Energy"},{id:5, "name":"Healing"}]
  const {error, categories} = useCategories()
 

  const handleClick = (cat) => {
      if (actCat.id === cat.id){
          setActCat({})
      }else{
          setActCat(cat)
      }
  
  };

  if (error){
    return(
      <Box sx={{display:"flex"}}>
        <Error>{error}</Error>
      </Box>
    )
  }

  if (!categories){
    return(
      <Box sx={{display:"flex"}}>
        <CircularProgress/>
      </Box>
    )
  }



  return (
    <Stack direction="row" spacing={1}>
        {categories?.map( (cat)=>( 
            cat.id === actCat.id ?
            <Chip key={cat.id} label={cat.name} color="primary" variant="filled" onClick={()=>handleClick(cat)}/> 
            :
            <Chip key={cat.id} label={cat.name} color="primary" variant="outlined" onClick={()=>handleClick(cat)}/>
         ) )}
    </Stack>
  );
}
