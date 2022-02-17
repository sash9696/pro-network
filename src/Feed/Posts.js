import React, { forwardRef, useEffect } from 'react';
import './Posts.css';
import { Avatar } from "@material-ui/core";
import InputItems from './InputItems';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon  from '@material-ui/icons/SendOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import MessageOutlinedIcon  from '@material-ui/icons/MessageOutlined';
import ClearIcon  from '@material-ui/icons/Clear';
import db from '../firebase';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';

const Posts = forwardRef (({id, name, message, description, photoUrl, like, comment, onLikeClick, userIdInPost},ref) => {

    const user = useSelector(selectUser);
    const deletePost = () => {
        if(userIdInPost === user.uid) {
            db.collection('posts').doc(id).delete()
        }
        else {
            alert("You can't delete someone else's post.")
        }
    }
    return (
        <div ref={ref} className='posts_container'>
            <div className="posts_header">
                <p> <Avatar  className='sidebar_avatar' src={photoUrl || ""}>
                    {name[0].toUpperCase()}
                    </Avatar></p>
                <div className="posts_info">
                    <p className='posts_name'>{name}</p>
                    <p className='posts_des'>{description}</p>
                </div>
            </div>
            <div className="posts_body">
                    <p>{message} </p>
            </div>
            <div className="posts_options">
                <InputItems Icon={ThumbUpOutlinedIcon} onLikeClick={onLikeClick} title="Like" like={like}/>
                <InputItems Icon={MessageOutlinedIcon} title="Comment" comment={comment} />
                <InputItems Icon={ShareOutlinedIcon} title="Share" />
                <InputItems Icon={SendOutlinedIcon } title="Send" />    
                <div onClick={deletePost} className="delete">
                    <InputItems Icon={ClearIcon } title="Delete" />  
                </div>
            </div>        
        </div>
    )  
})

export default Posts
