import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HeaderOptions from './HeaderOptions';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import sahil from '../images/sahil.jpeg';
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
import { logout } from '../features/userSlice';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Header({ search, setSearch, theme, setTheme}) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutOfApp = () => {
        dispatch(logout())
        auth.signOut()
    }
    const toggleTheme = () => {
        if(!theme)
        {
          document.querySelector('html').style.filter = 'invert(1)'
          localStorage.setItem('theme', !theme)
          setTheme(!theme)
        }
        else{
            document.querySelector('html').style.filter = 'invert(0)'
            localStorage.setItem('theme', false)
            setTheme(!theme)

        }
       

    }
    const goToHomePage = () => {
        navigate('/')
    }

    const goToAboutPage = () => {
        navigate('/about-us')
    }

    const goToProfilePage = () => {
        navigate('/profile')
    }

    return (
        <div className='header_container'>
            <div className="header_left">
                <Link to='/'>
                    <img className='header_image'  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dYFM1O8GbZ52Bc3lQqGXRSOsJrK3RnHbaQ&usqp=CAU " alt=""/>

                </Link>
                <div className="search_box">
                    <SearchIcon className='search_icon'/>
                    <input type="text" placeholder='Search User' value={search} onChange={(e => setSearch(e.target.value))} />
                </div>
            </div>
            <div className="header_right">
                <Button style={{border: 'none', color: "#0047ab"}} variant="outlined">Hi, {user.displayName}</Button>
                <Button style={{border: 'none', color: "#0047ab"}} onClick={goToHomePage} variant="outlined">Home</Button>
                <Button style={{border: 'none', color: "#0047ab"}} onClick={goToAboutPage} variant="outlined">About Us</Button>
                <Button style={{marginRight: "20px", border: 'none', color: "#0047ab"}} onClick={goToProfilePage} variant="outlined">Profile</Button>
                <Button style={{border: 'none', color: "#0047ab"}} onClick={toggleTheme} variant="outlined">{!theme  ? 'Dark Mode' : 'Light Mode'}</Button>
                <Button style={{backgroundColor: "#0047ab", color: 'white'}} onClick={logOutOfApp} variant="outlined">Logout</Button>
            </div>
        </div>
    )
}

export default Header
