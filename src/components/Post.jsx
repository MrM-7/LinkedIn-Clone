/* eslint-disable react/prop-types */
import '../Css/post.css'
import { forwardRef } from 'react';
import { Avatar } from '@mui/material'
import InputOption from './InputOption'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import RepeatIcon from '@mui/icons-material/Repeat';


const Post = forwardRef(function Post({ name, description, message, photoUrl }, ref){
  return (
    <div ref={ref} className="post">
      <div className="post__header">
            <Avatar src={photoUrl} > {name[0]} </Avatar>
            <div className="post__info">
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>

        <div className="post__body">
            <p>{message}</p>
        </div>

        <div className="post__buttons">
            <InputOption Icon={ThumbUpOffAltIcon} title="Like" color="gray"/>
            <InputOption Icon={CommentIcon} title="Comment" color="gray"/>
            <InputOption Icon={RepeatIcon} title="Repost" color="gray"/>
            <InputOption Icon={SendIcon} title="Send" color="gray"/>
        </div>
    </div>
  )
})


export default Post
