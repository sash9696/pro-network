import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login } from '../features/userSlice';
import EditProfileInput from './EditProfileInput';
import './ProfilePage.css';
import firebase from 'firebase/compat/app'
import { auth } from '../firebase';


function ProfilePage() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [name, setName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [nameEditClick, setNameEditClick] = useState(false);
    const [emailEditClick, setEmailEditClick] = useState(false);

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

    // auth.onAuthStateChanged(function(user) {
    //     if (user) {
    //         console.log('Display name onAuthStateChanged : '+user.displayName);
    //         updateUserData();
    //     } else {
    //         console.log('not login');
    //     }
    // });

    // const updateUser = () => {
    //     authRef.onAuthStateChanged(function(user) {
    //         if (user) {
    //             console.log('Display name onAuthStateChanged : '+user.displayName);
    //             updateUserData();
    //         } else {
    //             console.log('not login');
    //         }
    //     });
    // }

    const updateUserData = () => {
        
        var userNow = auth.currentUser;
          userNow.updateProfile({
          displayName: name,
          email: email,
        }).then(function() {
            dispatch(login({
                email: email,
                displayName: name,
            }))
        //   var displayName = userNow.displayName;
        //   var photoURL = userNow.photoURL;
        }, function(error) {
            console.log(error)
        })
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
            />
        ))}
    </div>
  )
}

export default ProfilePage