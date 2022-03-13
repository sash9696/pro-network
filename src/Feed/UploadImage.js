import React from 'react';
import './UploadImage.css';
import db from '../firebase';
import ClearIcon from '@material-ui/icons/Clear';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import {v4 as uuid} from "uuid";
function UploadImage({selectedImage, setSelectedImage,closeUploadImage, setCloseUploadImage}) {
    const [message, setMessage] = useState("")
    const user = useSelector(selectUser)
    const [image, setImage] = useState('');
    const [Url, setUrl] = useState('');

    console.log('selectedImage.name',selectedImage.name)
    
    const upload = () => {
       
      }
   
    const addPhoto = () => {
        // db.collection('posts').add({
        //    img: selectedImage,
        // })
        console.log("working")
        

const storage = getStorage();
const metadata = {
    contentType: selectedImage.type
  };
const storageRef = ref(storage, `posts/${user?.uid}`);
uploadString(storageRef, selectedImage.name, 'data_url').then((snapshot) => {
    console.log('snapshot',snapshot)
  });
  const uploadTask = uploadBytesResumable(storageRef, selectedImage.name, metadata);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed',null , 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
            console.log(downloadURL)
    //         db.collection('posts').add({
    //             imageUrl: downloadURL,
    //             username: user.username,
    //             read:false,
    //             profilePic: user.profilePic,
    //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   })
    });
  }
);

        
        setCloseUploadImage(!closeUploadImage)
        console.log(selectedImage)
    }
    const closeModal = () => {
        setCloseUploadImage(!closeUploadImage)
    }
  return (
    <div className='uploadImage'>
            <h1>Hi</h1>
            <button onClick={upload}>Upload</button>
            <ClearIcon onClick={closeModal}/>
            <div className="display-image">
            {selectedImage && (
                <div>
                <img className='uploadImage-preview' alt="not fount"  src={URL.createObjectURL(selectedImage)} />
                <br />
                <div className="uploadImage-post">
                   
                    
                    <input value={message} onChange={(e) => setMessage(e.target.value)} className='uploadImage-body' type='text' placeholder='Message goes here'/>
                    
                </div>
                
                <button onClick={()=>setSelectedImage(null)}>Remove</button>
                <button onClick={addPhoto}>Add</button>
                </div>
            )}
            </div> 
    </div>
  )
}

export default UploadImage