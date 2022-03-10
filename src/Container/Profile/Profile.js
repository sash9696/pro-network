import React from 'react';
import './Profile.css';
import ProfilePage from '../../ProfilePage/ProfilePage';

function Profile({check, setCheck, password, setPassword}) {
  return (
    <div className='container_profile'>
        <ProfilePage check={check} setCheck={setCheck} password={password} setPassword={setPassword} />
    </div>
  )
}

export default Profile