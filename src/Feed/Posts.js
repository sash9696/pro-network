import React, { forwardRef, useEffect } from 'react';
import './Posts.css';
import { Avatar } from "@material-ui/core";
import InputItems from './InputItems';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon  from '@material-ui/icons/SendOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MessageOutlinedIcon  from '@material-ui/icons/MessageOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import db from '../firebase';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';

const Posts = forwardRef (({id, name, message, description, photoUrl, like, likedBy, hasUserLikedThePost, comment, postDeletionSuccess, setPostDeletionSuccess, cantDeleteOthersPost, setCantDeleteOthersPost, showCantDeleteOthersPost, onLikeClick, userIdInPost},ref) => {

    const user = useSelector(selectUser);

    const setCantDeleteOthersPostFalse = () => {
        setTimeout(() => {
            setCantDeleteOthersPost(false)
        }, 4000)
    }

    const postDeleted = () => {
        setTimeout(() => {
            setPostDeletionSuccess(false)
        }, 4000)
    }
    
    const deletePost = () => {
        if(userIdInPost === user.uid) {
            db.collection('posts').doc(id).delete()
            setPostDeletionSuccess(true)
            postDeleted()
        }
        else {
            setCantDeleteOthersPost(true)
            setCantDeleteOthersPostFalse()
        }
    }

    return (
        <div ref={ref} className='posts_container'>
            <div className="posts_header">
                <p> <Avatar className='sidebar_avatar' src={photoUrl || ""}>
                    {name[0].toUpperCase()}
                    </Avatar></p>
                <div className="posts_info">
                    <p className='posts_name'>{name}</p>
                    <p className='posts_des'>{description}</p>
                </div>
            </div>
            <div className="posts_body">
                    <p>{message}</p>
            </div>
            <div className="posts_options">
                <InputItems 
                    Icon={hasUserLikedThePost ? ThumbUpIcon : ThumbUpOutlinedIcon} 
                    onLikeClick={onLikeClick} 
                    title={likedBy?.length === 1 ? "Like" : "Likes"} 
                    like={likedBy?.length} 
                    color={hasUserLikedThePost ? "#0047ab" : ""}
                /> 
                <InputItems 
                    Icon={MessageOutlinedIcon} 
                    title="Comment" 
                    comment={comment} 
                />
                <InputItems 
                    Icon={ShareOutlinedIcon} 
                    title="Share" 
                />
                {/* <InputItems 
                    Icon={SendOutlinedIcon} 
                    title="Send" 
                />     */}
                <div onClick={deletePost}>
                    <InputItems 
                        Icon={DeleteOutlineIcon}
                        title="Delete" 
                    />  
                </div>
            </div>        
        </div>
    )  
})

export default Posts
