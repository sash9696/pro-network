import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { auth } from '../firebase';
import './Login.css';
import { login } from '../features/userSlice';


function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const  dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
       
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth)=>{
            dispatch(login({
                email: userAuth?.email,
                uid: userAuth?.uid,
                displayName: userAuth?.displayName,
            }))
        }).catch((error) => {
            alert(error.message)
        })
    }
    const register = () => {
        if(!name)
        {
            return alert('Please enter full name!');
        }
            auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
                userAuth.user.updateProfile({
                    displayName: name,
                    photoUrl: profilePic,

                }).then(() =>{
                    dispatch(login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                    }))
                })
            })
            .catch((error) => alert(error));
    };
    
   



    return (
        <div className='login_container'>
            <img src='data:image/png;base64,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' 
                 alt=''/>
            <form>
                <input value={name} onChange={(e => setName(e.target.value))} placeholder='Full Name (required if registering)' type='text'/>
                <input value={profilePic} onChange={(e => setProfilePic(e.target.value))} placeholder='Profile Pic Url (optional)' type='text'/>
                <input value={email} onChange={(e => setEmail(e.target.value))} placeholder='Email' type='email'/>
                <input value={password} onChange={(e => setPassword(e.target.value))} placeholder='Password' type='password'/>
                <button onClick={loginToApp} className='signin_button' type='submit'>Sign In</button>
            </form>
            <p>Not a member?<span onClick={register} className='register_option'> Register now.</span></p>
           
        </div>
    )
}

export default Login
