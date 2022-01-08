import React, {useEffect} from 'react';
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


function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,

        }))
      }else{
        dispatch(logout());
       
      }

    })
    
  }, [])

  return (
    <div className="app">
      <Header/>
      {/* App Body */}
      {!user ? <Login/> : (
          <div className="app_body"> 
          <Sidebar avatar= {sahil}/>
          <Feed/>
          <Widgets/>
        </div>
      )}
    
      
    </div>
  );
}

export default App;
