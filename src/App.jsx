
import { useDispatch, useSelector } from 'react-redux';
import Feed from './components/Feed';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './Css/app.css'
import { login, selectUser } from './features/userSlice';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Widgets from './components/Widgets';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        // user logged-in
         dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.name,
          photoURL: user.profilePic
        }))
      } else{
        // user logged-out
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="app">

        {
          !user ? <Login /> : (<>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widgets />
            </div>
          </>
          )
        }
      </div>
    </>
  )
}

export default App
