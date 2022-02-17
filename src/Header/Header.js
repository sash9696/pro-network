import React from 'react';
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
import { auth } from '../firebase';
import { logout } from '../features/userSlice';

function Header() {
    const dispatch = useDispatch();
    const logOutOfApp = () => {
        dispatch(logout())
        auth.signOut()
    }
    return (
        <div className='header_container'>
            <div className="header_left">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dYFM1O8GbZ52Bc3lQqGXRSOsJrK3RnHbaQ&usqp=CAU " alt=""/>
                <div className="search_box">
                    <SearchIcon className='search_icon'/>
                    <input type="text" placeholder='Search'/>
                </div>
            </div>
            <div className="header_right">
                <HeaderOptions Icon={HomeIcon} title="Home"/>
                <HeaderOptions Icon={SupervisorAccountIcon} title="My Network"/>
                <HeaderOptions Icon={BusinessCenterIcon} title="Jobs"/>
                <HeaderOptions Icon={ChatIcon} title="Messaging"/>
                <HeaderOptions Icon={NotificationsIcon} title="Notifications"/>
                <HeaderOptions avatar={sahil} title="Me" onClick={logOutOfApp} />
                
            </div>
            
        </div>
    )
}

export default Header
