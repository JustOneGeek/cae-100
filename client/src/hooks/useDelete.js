import React, {useEffect, useState, useContext} from 'react';
import { CancelToken } from 'apisauce';
import apiItem from '../api/apiItem';
import apiCat from '../api/apiCategory';
import { AppContext } from '../context/AppContext';
import {useNavigate} from 'react-router-dom';


export default function useDelete(obj) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(()=>{
        let response
        const source=CancelToken.source()
        const apiCalls =async()=>{
            if (obj.desc && obj.name){
                //then we we have an item
                response = apiItem.del(user?.token,obj.id,source.token)
            }else if(obj.name){
                // its a cat
                response = apiCat.del(user?.token,obj.id,source.token)
            }

            if (!response?.error){
                setAlert({msg:`${obj.name} Deleted`,cat:'info'})
            }else if(response.error){
                setAlert({msg:response.error, cat:'warning'})
                navigate('/')
            }
        }
        
        if(obj?.id){
            apiCalls()
        }
        return ()=>{source.cancel()}
    },[obj, navigate, user.token, setAlert]
    )
}
