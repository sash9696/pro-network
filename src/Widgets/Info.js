import React from 'react';
import './Info.css'
import ClearIcon from '@material-ui/icons/Clear'
import { getAuth, deleteUser } from "firebase/auth";
function Info({info, setInfo, message, check, setCheck, button}) {

    const closeInfo = () => {
      setInfo(!info) 
    }
    const closeCheck = () => {
      setCheck(!check)
    }
    
    // const uid = auth._delegate.currentUser.uid
        const auth = getAuth();
        const user = auth.currentUser;

    const deleteAccount = () => {

      if(user.email === 'guest@gmail.com'){
        alert('guest user cannot be deleted')
      }
      else {
        deleteUser(user).then(() => {
          // User deleted.
          setCheck(!check)
  
        }).catch((error) => {
          // An error ocurred
          // ...
        });
      }
      
    }
  return (
    <div className='info'>
        <div className="info-content">
            <p>
              {message}
            </p> 
        <div className="close-checkButton">
             {button && <button onClick={deleteAccount}>Yes</button>}
        </div>
            
        </div>
      <ClearIcon className='close-icon' onClick={info ? closeInfo : closeCheck}/>
    </div>
  )
}

export default Info;