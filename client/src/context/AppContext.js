import {createContext, useState, useReducer, useEffect} from 'react'
import { cartReducer, cartActions } from "../reducers/cartReducer";

export const AppContext = createContext();

const AppContextProvider = ({children})=>{
    const getUserFromLS=()=>{
        const u = localStorage.getItem('user-crave')
        if(u){
            return JSON.parse(u)
        }
    }

    const getCartFromLS=()=>{
        const c = localStorage.getItem('cart-crave')
        if(c){
            return JSON.parse(c)
        }
    }

    const [alert, setAlert]= useState({})
    const [user, _setUser] = useState(getUserFromLS()??'')
    const [cart, dispatch] = useReducer(cartReducer, getCartFromLS()??[])

    const setUser =(user)=>{
        _setUser(user)
        localStorage.setItem('user-crave', JSON.stringify(user))
    }

    useEffect(
        ()=>{
            localStorage.setItem('cart-crave',JSON.stringify(cart))
        },[cart]
    )

    const values={
        alert,
        setAlert,
        user,
        setUser,
        cart,
        addToCart:(item)=>{
            dispatch({type: cartActions.addToCart, item})
        },
        addBulkToCart:(item)=>{
            dispatch({type: cartActions.addBulkToCart, item})
        },
        removeFromCart:(item)=>{
            dispatch({type: cartActions.removeFromCart, item})
        },
        removeAllFromCart:(item)=>{
            dispatch({type: cartActions.removeAllFromCart, item})
        },
        emptyCart:()=>{
            dispatch({type: cartActions.emptyCart})
        }


    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;