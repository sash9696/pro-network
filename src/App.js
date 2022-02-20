import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import sahil from './images/sahil.jpeg';
import Feed from './Feed/Feed';
import {useSelector, useDispatch} from "react-redux";
import { selectUser } from './features/userSlice';
import Login from './Login/Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Widgets from './Widgets/Widgets';
// import Example from './Example';


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
    <div className="app">
      {user && <Header search={search} setSearch={setSearch} /> } 
      {/* App Body */}
      {!user ? <Login/> : (   
          <div className="app_body"> 
          <Sidebar avatar= {sahil}/>
          <Feed search={search} />
          <Widgets/>
        </div>
      )}
    </div>
  );
}

export default App;
