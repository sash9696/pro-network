import React, {useEffect, useState} from 'react';
import './Feed.css';
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import InputItems from './InputItems';
import Posts from './Posts';
import sahil from '../images/sahil.jpeg';
import db from '../firebase';
import firebase from 'firebase/compat/app'
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';


function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map(doc => (
                {
                id: doc.id,
                data: doc.data()
            }
            ))

            )
        })
    }, [])

    const sendPost = (e) => {
        e.preventDefault();
        //database
        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message:input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    };
    return (
        <div className='feed_container'>
            <div className="container">
                    <div className="input_container">
                        <CreateIcon/>
                        <form>
                            <input value={input} onChange = {(e => setInput(e.target.value))} type="text"/>     
                            <button onClick={sendPost} type='submit'>Submit</button>          
                        </form>
                    </div>
                    <div className="input_items">
                         <InputItems Icon={ImageIcon} title="Photo" color="#70B5F9"/>
                         <InputItems Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
                         <InputItems Icon={EventNoteIcon} title="Event" color="#E7A33E"/>
                         <InputItems Icon={CalendarViewDayIcon} title="Write Article" color="#E7A33E"/>
                    </div>
            </div>
            <FlipMove>
                {posts.map(({id, data:{name, description, message, photoUrl}}) => ( 
                      <Posts avatar={sahil}
                        key = {id}
                        name = {name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}

                      />
                
                
                ))}
            </FlipMove>
                
                

            
        </div>
    )
}

export default Feed
