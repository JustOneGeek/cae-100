
import React, {useEffect, useState} from 'react';
import { CancelToken } from 'apisauce';
import apiCategory from '../api/apiCategory';

export default function useCategories() {
      
      const [response, setResponse] = useState('')
    
      useEffect(()=>{
        const source=CancelToken.source();
        const apiCall=async()=>{
          const r = await apiCategory.get(source.token)
          setResponse(r)
        }
        apiCall()
        return ()=>{source.cancel()}
      },[])
      
    return response
}
