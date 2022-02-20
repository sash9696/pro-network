import React, {useEffect, useState} from 'react';
import './Feed.css';
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import InputItems from './InputItems';
import Posts from './Posts';
import db from '../firebase';
import firebase from 'firebase/compat/app'
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';

function Feed({ search }) {
    const user = useSelector(selectUser);
    
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [olderPosts, setOlderPosts] = useState([]);
    const [cantDeleteOthersPost, setCantDeleteOthersPost] = useState(false);
    const [postDeletionSuccess, setPostDeletionSuccess] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState('');
    const [postUpdationSuccess, setPostUpdationSuccess] = useState(false);
    const [cantUpdateOthersPost, setCantUpdateOthersPost] = useState(false);

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
            })
    } 

    const sendPost = (e) => {
        e.preventDefault();
        db.collection('posts').add({
            userIdInPost: user.uid,
            name: user.displayName,
            description: user.email,
            message:input,
            photoUrl: user.photoUrl || "",
            likeCount: 0,
            likedBy: [],
            commentCount: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    };

    const likeThePost = (id, likeCount) => {
        db.collection('posts').doc(id).update({
            likeCount: likeCount+1,
            likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
    }

    const dislikeThePost = (id, likeCount) => {
        db.collection('posts').doc(id).update({
            likeCount: likeCount-1,
            likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid)
        })
    }

    const onlikePost = (id, likedBy, likeCount) => {
        if (likedBy.includes(user.uid)) {
            dislikeThePost(id, likeCount)
        }   
        else {
            likeThePost(id, likeCount)
        }
    }

    const showCantDeleteOthersPost = () => (
        <div className='feed_cant_delete_others_post'>
            You can't delete someone else's post
        </div>
    )

    const showPostDeleted = () => (
        <div className='feed_post_deleted'>
            Post deleted successfully
        </div>
    )

    const updateThePost = (id, userIdInPost) => {
        if(userIdInPost === user.uid) {
            db.collection('posts').doc(id).update({
                message: updatedMessage,
            }).then(() => {
                setPostUpdationSuccess(true)
                postUpdated()
                setUpdatedMessage('')
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            setCantUpdateOthersPost(true)
            cantUpdatePost()
            setUpdatedMessage('')
        }
    }

    const showPostUpdated = () => {
        <div className='feed_post_deleted'>
            Post updated successfully
        </div>
    }

    const showCantUpdateOthersPost = () => (
        <div className='feed_cant_delete_others_post'>
            You can't update someone else's post
        </div>
    )

    const postUpdated = () => {
        setTimeout(() => {
            setPostUpdationSuccess(false)
        }, 4000)
    }

    const cantUpdatePost = () => {
        setTimeout(() => {
            setCantUpdateOthersPost(false)
        }, 4000)
    }

    return (
        <div className='feed_container'>
            {cantDeleteOthersPost && showCantDeleteOthersPost()}
            {postDeletionSuccess && showPostDeleted()}
            {postUpdationSuccess && showPostUpdated()}
            {cantUpdateOthersPost && showCantUpdateOthersPost()}
            <div className="container">
                    <div className="input_container">
                        <CreateIcon/>
                        <form>
                            <input value={input} onChange = {(e => setInput(e.target.value))} type="text"/>     
                            <button onClick={sendPost} type='submit'>Post</button> 
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
                { search ? 
                    (posts.filter(msg => msg?.data.name?.includes(search)).map(({id, data:{name, description, message, photoUrl, likeCount, likedBy, commentCount, userIdInPost}}) => ( 
                        <Posts 
                            id = {id}
                            name = {name}
                            description= {description}
                            message= {message}
                            photoUrl= {photoUrl}
                            likedBy={likedBy}
                            comment={commentCount}
                            userIdInPost={userIdInPost}
                            postDeletionSuccess={postDeletionSuccess}
                            setPostDeletionSuccess={setPostDeletionSuccess}
                            cantDeleteOthersPost={cantDeleteOthersPost}
                            setCantDeleteOthersPost={setCantDeleteOthersPost}
                            showCantDeleteOthersPost={showCantDeleteOthersPost}
                            hasUserLikedThePost={likedBy?.includes(user.uid)}
                            onLikeClick={() => onlikePost(id, likedBy, likeCount)}
                            // showPostUpdated={showPostUpdated}
                            updatedMessage={updatedMessage}
                            setUpdatedMessage={setUpdatedMessage}
                            updateThePost={() => updateThePost(id, userIdInPost)}
                        />
                    ))) 
                    : 
                        (posts.map(({id, data:{name, description, message, photoUrl, likeCount, likedBy, commentCount, userIdInPost}}) => ( 
                            <Posts 
                                id = {id}
                                name = {name}
                                description= {description}
                                message= {message}
                                photoUrl= {photoUrl}
                                likedBy={likedBy}
                                comment={commentCount}
                                userIdInPost={userIdInPost}
                                postDeletionSuccess={postDeletionSuccess}
                                setPostDeletionSuccess={setPostDeletionSuccess}
                                cantDeleteOthersPost={cantDeleteOthersPost}
                                setCantDeleteOthersPost={setCantDeleteOthersPost}
                                showCantDeleteOthersPost={showCantDeleteOthersPost}
                                hasUserLikedThePost={likedBy?.includes(user.uid)}
                                onLikeClick={() => onlikePost(id, likedBy, likeCount)}
                                // showPostUpdated={showPostUpdated}
                                updatedMessage={updatedMessage}
                                setUpdatedMessage={setUpdatedMessage}
                                updateThePost={() => updateThePost(id, userIdInPost)}
                            />
                        )))
                }
            </FlipMove>              
        </div>
    )
}

export default Feed
