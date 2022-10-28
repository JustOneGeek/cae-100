import {apiClientNoAuth, apiClientTokenAuth} from './client'
const endpoint = '/api/item'

const get=async (cancelToken)=>{

    let error
    let items

    const response = await apiClientNoAuth(cancelToken).get(endpoint)
    if (response.ok){
        items = response.data.items
    }else{
        error="An Unexpected Error Occured. Please Try Again Later"
    }

    return {
        error,
        items
    }
}


const post = async (token, data, cancelToken)=>{
    let error
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, data)
    if (!response.ok){
        error="An Unexpected Error Occured. Please Try Again Later"
    }
    return {
        error
    } 
}

const getItem = async (id, cancelToken)=>{
    let error
    let item
    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/'+id)
    if (response.ok){
        item = response.data
    }else if(response.status === 404){
        error = "Your item was Not Found"
    }else{
        error = "An Unexpected Error Occured. Please Try Again Later"
    }

    return {
        error,
        item,
    }

}

const getByCat = async (id, cancelToken)=>{
    let error
    let items

    const response = await apiClientNoAuth(cancelToken).get(endpoint+'/category/'+id)
    if (response.ok){
        items = response.data.items
    }else if(response.status === 404){
        error = "Your Category was Not Found"
    }else{
        error = "An Unexpected Error Occured. Please Try Again Later"
    }

    return {
        error,
        items,
    }
}

const put = async (token, id, data, cancelToken) =>{
    let error

    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id,data)
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



const apiItem={
    get,
    post,
    getItem,
    getByCat,
    put,
    del
}
export default apiItem
