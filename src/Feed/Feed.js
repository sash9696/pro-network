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
    const user = useSelector(selectUser);
    
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [olderPosts, setOlderPosts] = useState([]);
    useEffect(() => {
            getPosts();
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
    
    const getPosts = () => {
        async function postData(url = '') {
            const response = await fetch(url);
            return response.json()
        }
        postData("https://mocki.io/v1/6e441185-0ffc-49c7-ae5f-a5a0b2787b56")
            .then((data) => {
                setOlderPosts(data.posts);
                console.log(data);
            })
    } 

    const sendPost = (e) => {
        e.preventDefault();
        //database
        db.collection('posts').add({
            userIdInPost: user.uid,
            name: user.displayName,
            description: user.email,
            message:input,
            photoUrl: user.photoUrl || "",
            likeCount: 0,
            commentCount: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    };

    const updatePost = (id, likeCount) => {
            db.collection('posts').doc(id).update({
                likeCount: likeCount+1,
                // commentCount: commentCount+1
            })
            
    }
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
                {posts.map(({id, data:{name, description, message, photoUrl, likeCount, commentCount, userIdInPost}}) => ( 
                      <Posts 
                        id = {id}
                        name = {name}
                        description= {description}
                        message= {message}
                        photoUrl= {photoUrl}
                        like={likeCount}
                        comment={commentCount}
                        userIdInPost={userIdInPost}
                        onLikeClick={() => updatePost(id, likeCount)}
                      />
                ))}
            </FlipMove>  
            
                {olderPosts.map((data) => (
                    <Posts
                        id = {data.id}
                        name = {data.name}
                        description= {data.description}
                        message= {data.message}
                        like= {data.likeCount}
                        comment= {data.commentCount}
                    />
                ))}
            
             
        </div>
    )
}

export default Feed
