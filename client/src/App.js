
import './App.css';
import {useContext} from 'react';
import Error from './components/Error';
import Button from './components/Button';
import CategoryBar from './components/CategoryBar';
import AdminMenu from './components/AdminMenu';
import NavBar from './components/NavBar';
import Item from './components/Item';
import ItemBrowser from './components/ItemBrowser';
import LoginForm from './forms/LoginForm';
import CatForm from './forms/CatForm';
import ItemForm from './forms/ItemForm';
import Shop from './views/Shop';
import Login from './views/Login';
import AdminCategory from './views/AdminCategory';
import AdminItem from './views/AdminItem';
import CheckOutSuccess from './views/CheckOutSuccess';
import CartPage from './views/CartPage';
import {Route, Routes} from 'react-router-dom';
import SnackBar from './components/SnackBar';
import LogOut from './components/LogOut';
import {AppContext} from './context/AppContext';
import RequireAdmin from './components/RequireAdmin';
import Box from '@mui/material/Box';
import SingleItem from './views/SingleItem';

const HomePage = () => (<h1>Welcome To CrAvE!</h1>)

function App() {
  const {user} = useContext(AppContext)

  return (
  <>
      <SnackBar/>
      <NavBar>
        <Box sx={{minHeight:'90vh'}}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/cart/:canceled" element={<CartPage/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/shop/:itemId" element={<SingleItem/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/checkoutsuccess" element={<CheckOutSuccess/>}/>
            <Route path="/logout" element={<LogOut/>}/>

            <Route path="/admincat" element={<RequireAdmin redirectTo="/login"><AdminCategory/></RequireAdmin>}/>
            <Route path="/adminItem" element={<RequireAdmin redirectTo="/login"><AdminItem/></RequireAdmin>}/>
          </Routes>
         </Box>
      {user?.is_admin?<AdminMenu/>:<></>}
      </NavBar>
  </>
  );
}

export default App;

