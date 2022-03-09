import React, { forwardRef, useState } from 'react';
import './Posts.css';
import { Avatar } from "@material-ui/core";
import InputItems from './InputItems';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MessageOutlinedIcon  from '@material-ui/icons/MessageOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import db from '../firebase';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const Posts = forwardRef (({id, name, message, description, photoUrl, likedBy, hasUserLikedThePost, comment, setPostDeletionSuccess, setCantDeleteOthersPost, onLikeClick, userIdInPost, updatedMessage, setUpdatedMessage, updateThePost, checkIfUsersPost, usersPost},ref) => {

    const user = useSelector(selectUser);
    const [modalIsOpen, setIsOpen] = useState(false);

    

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

    const customStyles = {
        content: {
          width: '30%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          borderColor: '#0047ab',
          transform: 'translate(-50%, -50%)',
        },
      };

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const editPostHandler = (e) => {
        setUpdatedMessage(e.target.value)
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
            <div className={usersPost ? "posts_options" : "posts_options_not_user"}>
                <InputItems 
                    Icon={hasUserLikedThePost ? ThumbUpIcon : ThumbUpOutlinedIcon} 
                    onClick={onLikeClick} 
                    title={likedBy?.length <= 1 ? "Like" : "Likes"} 
                    like={likedBy?.length} 
                    color={hasUserLikedThePost ? "#0047ab" : ""}
                /> 
                {/* <InputItems 
                    Icon={MessageOutlinedIcon} 
                    title="Comment" 
                /> */}
                {usersPost && 
                    <InputItems 
                        Icon={EditIcon} 
                        title="Edit" 
                        onClick={openModal}
                    />
                }
                
                {/* <InputItems 
                    Icon={ShareOutlinedIcon} 
                    title="Share" 
                /> */}
                {/* <InputItems 
                    Icon={SendOutlinedIcon} 
                    title="Send" 
                />     */}
                {usersPost &&
                    <div onClick={deletePost}>
                    <InputItems 
                        Icon={DeleteOutlineIcon}
                        title="Delete" 
                    />  
                    </div>
                }
                
            </div>  
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='edit_post_modal_heading'>
                    <h2>Edit Post</h2>
                    <button className='edit_post_modal_heading_close' onClick={closeModal}>&#10539;</button>
                </div>
                <input className='edit_post_modal_input' value={updatedMessage} onChange={editPostHandler} />
                <div className='edit_post_modal_update_btn' onClick={() => {updateThePost(); closeModal();}}>
                    <Button style={{backgroundColor: "#0047ab", color: 'white'}} variant="outlined">Update</Button>
                </div>
            </Modal>      
        </div>
    )  
})

export default Posts
