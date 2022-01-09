import React, { forwardRef } from 'react';
import './Posts.css';
import { Avatar } from "@material-ui/core";
import InputItems from './InputItems';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon  from '@material-ui/icons/SendOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import MessageOutlinedIcon  from '@material-ui/icons/MessageOutlined';

const  Posts = forwardRef (({id, name, message, description, photoUrl, like, comment, onLikeClick},ref) => {

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
        </div>        
        </div>
    )  
})

export default Posts
