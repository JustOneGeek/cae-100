import React from 'react'
import Item from '../components/Item'
import Box from '@mui/material/Box'

export default function SingleItem() {
  return (
    <Box sx={{maxWidth:"75%", mx:"auto"}}>
        <Item/>
    </Box>
  )
}
