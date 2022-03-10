import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login } from '../features/userSlice';
import EditProfileInput from './EditProfileInput';
import './ProfilePage.css';
import firebase from 'firebase/compat/app'
import { auth } from '../firebase';
import Info from '../Widgets/Info';
import { updateEmail } from 'firebase/auth'
import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
} from 'firebase/auth'
import Button from '@material-ui/core/Button';

function ProfilePage({check, setCheck }) {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const auths = getAuth()

    const [name, setName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [nameEditClick, setNameEditClick] = useState(false);
    const [emailEditClick, setEmailEditClick] = useState(false);
    const [password, setPassword] = useState('');

    const profileInputFields = [
        {
            id: 1,
            label: "Name",
            defaultValue: name
        },
        {
            id: 2,
            label: "Email",
            defaultValue: email
        }
    ]

    const editName = () => {
        setNameEditClick(!nameEditClick)
    }

    const editEmail = () => {
        setEmailEditClick(!emailEditClick)
    }

    const updateName = () => {
            var userNow = auth.currentUser;
            if (name !== user.displayName) {
                userNow.updateProfile({
                    displayName: name,
                }).then(() => {
                    dispatch(login({
                        displayName: name,
                        email: email,
                        uid: user.uid
                    }))
                }, function(error) {
                    console.log(error)
                })
            }
    
    }

    const updateUserEmail = () => {
        // if (email) {
            
            var userNow = auth.currentUser;
            if (email !== user.email) {
                userNow.updateEmail(email).then(function() {
                    dispatch(login({
                        displayName: name,
                        email: email,
                        uid: user.uid
                    }))
                }, async function(error) {
                    console.log(error)
                    if (error.code === "auth/email-already-in-use") {
                        setEmail(user.email)
                        alert("Email Id already exist, please try again with another email.")
                    }
                    if (error.code === "auth/requires-recent-login") {
                        const pass = prompt("Please enter your password to continue.")
                        setPassword(pass)
                        const credential = EmailAuthProvider.credential(
                            userNow.email,
                            password
                        )
                        const result = await reauthenticateWithCredential(
                            userNow, 
                            credential
                        )
                       
                        
                    }
                })
            }
        // }
        // alert("Email address cannot be empty.")
    }

    const updateUserData = () => {
        
        var userNow = auth.currentUser;

        if (name !== user.displayName) {
            userNow.updateProfile({
                displayName: name,
                email: email,
            }).then(() => {
                dispatch(login({
                    displayName: name,
                }))
            }, function(error) {
                console.log(error)
            })
        }

        if (email !== user.email && name === user.displayName ) {
            userNow.updateEmail(email).then(function() {
                dispatch(login({
                    email: email,
                }))
            }, function(error) {
                console.log(error)
            })
        }
        
    }
   const confirm = () => {
       setCheck(!check)
       return <Info/>
   }

  return (
    <div className='profile_page'>
        {profileInputFields.map(val => (
            <EditProfileInput 
                label={val.label} 
                defaultValue={val.defaultValue}
                setName={setName}
                setEmail={setEmail}
                nameEditClick={nameEditClick}
                emailEditClick={emailEditClick}
                editName={editName}
                editEmail={editEmail}
                updateUserData={updateUserData}
                updateName={updateName}
                updateUserEmail={updateUserEmail}
            />
        ))}
        <div className="button">
            {check && <Info check={check}
                            setCheck={setCheck}
                            message='Are you sure you want to delete account? All Details related to the account will be deleted'
                            button={true}
            />}
            <Button 
                style={{backgroundColor: "#0047ab", color: 'white'}} 
                variant="outlined"
                onClick={confirm}
            >
                Delete your account
            </Button>
        </div>
    </div>
  )
}

export default ProfilePage