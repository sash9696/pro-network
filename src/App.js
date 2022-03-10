import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import {useSelector, useDispatch} from "react-redux";
import { selectUser } from './features/userSlice';
import Login from './Login/Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Widgets from './Widgets/Widgets';
// import Example from './Example';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Container/Home/Home';
import About from './Container/About/About';
import Profile from './Container/Profile/Profile';

function App() {
  
  const user = useSelector(selectUser);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        {user && <Header search={search} setSearch={setSearch} /> } 
        {/* App Body */}
        {!user ? <Login/> : (   
          <div className="app_body"> 
            <Routes>
              <Route path='/' element={<Home search={search} />} />  
              <Route path='/about-us' element={<About />} />  
              <Route path='/profile' element={<Profile />} />  
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
