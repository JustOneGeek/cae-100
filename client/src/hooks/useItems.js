
import React, {useEffect, useState} from 'react';
import { CancelToken } from 'apisauce';
import apiItem from '../api/apiItem';

export default function useCategories(categoryID=null) {
      
      const [response, setResponse] = useState('')
    
      useEffect(()=>{
        const source=CancelToken.source();
        const apiCallAll=async()=>{
          const r = await apiItem.get(source.token)
          setResponse(r)
        }
        const apiCallOne=async()=>{
            const r = await apiItem.getByCat(categoryID, source.token)
            setResponse(r)
          }
        categoryID ? apiCallOne():apiCallAll()
        return ()=>{source.cancel()}
      },[categoryID])
      
    return response
}
