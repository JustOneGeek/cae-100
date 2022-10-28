import { apiClientNoAuth, apiClientTokenAuth } from "./client"

const endpoint = '/api/category'

const get = async (cancelToken) =>{
    let error
    let categories

    const response = await apiClientNoAuth(cancelToken).get(endpoint)
    if (response.ok){
        categories = response.data.categories
    }else{
        error="An Unexpected Error Occured. Please Try Again Later"
    }

    return {
        error,
        categories
    }
}

const post = async (token, cat, cancelToken) =>{
    let error

    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint,cat)
    if (!response.ok){
        error="An Unexpected Error Occured. Please Try Again Later"
    }

    return { 
        error 
    }
    
}


const put = async (token, id, cat, cancelToken) =>{
    let error

    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id,cat)
    if (!response.ok){
        error="An Unexpected Error Occured. Please Try Again Later"
    }

    return { 
        error 
    }
}

const del = async (token, id, cancelToken) =>{
    let error

    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    if (!response.ok){
        error="An Unexpected Error Occured. Please Try Again Later"
    }

    return { 
        error 
    }
}



const apiCategory={
    get,
    post,
    put,
    del
}

export default apiCategory