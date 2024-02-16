import '../Css/feed.css'
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import FlipMove  from 'react-flip-move'

import Post from './Post';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase'; 
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useRef } from 'react';

const Feed = () => {

    const [posts, setPosts] = useState([])

    const inputRef = useRef()

    const user = useSelector(selectUser)

    
    const getPosts = async () => {
      const postCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(query(postCollection, orderBy("timestamp", "desc")));
  
      setPosts(
        postSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    };

    useEffect(() => {

      getPosts()
    }, []);
    

    const sendPost = async (e) => {
      e.preventDefault();

      if(inputRef.current.value === "" || inputRef.current.value.trim() == 0){
        return alert("Write something!!")
      }

      const postCollection = collection(db, 'posts');

      try {
        await addDoc(postCollection, {
          name: user.displayName,
          description: user.email,
          message: inputRef.current.value,
          photoUrl: user.photoURL,
          timestamp: serverTimestamp()
        });

        inputRef.current.value = ""
        getPosts()
      } catch (error) {
        console.error("Error adding post:", error);
      }
    };


  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed__input">
            <CreateIcon />
            <form>
                <input type="text" ref={inputRef}/>
                <button onClick={sendPost} type='submit'>Send</button>
            </form>
        </div>

        <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Media" color="#70B5F9"/>
            <InputOption Icon={EventIcon} title="Event" color="#EAA949"/>
            <InputOption Icon={ArticleIcon} title="Write article" color="#E27153"/>
        </div>
      </div>


      <FlipMove>
        {
          posts.map(({ id, data: { name, description, message, photoUrl } }) => (
              <Post 
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
          ))
        }
      </FlipMove>

    </div>
  )
}

export default Feed
