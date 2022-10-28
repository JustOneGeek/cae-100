import React, {useEffect, useState, useContext} from 'react';
import { CancelToken } from 'apisauce';
import apiItem from '../api/apiItem';
import apiCat from '../api/apiCategory';
import { AppContext } from '../context/AppContext';
import {useNavigate} from 'react-router-dom';
import { isObject } from 'formik';


export default function useCreate(obj) {
    const {user, setAlert} = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(()=>{
        let response
        const source=CancelToken.source()
        const apiCalls =async()=>{
            if (obj.desc && obj.name){
                //then we we have an item
                response = apiItem.post(user?.token, obj, source.token)
            }else if(obj.name){
                // its a cat
                response = apiCat.post(user?.token, obj, source.token)
            }

            if (!response?.error){
                setAlert({msg:`${obj.name} Created`,cat:'success'})
            }else if(response.error){
                setAlert({msg:response.error, cat:'warning'})
                navigate('/')
            }
        }
        
        if(obj){
            apiCalls()
        }
        return ()=>{source.cancel()}
    },[obj, navigate, user.token, setAlert]
    )
}
