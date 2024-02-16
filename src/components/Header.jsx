import '../Css/header.css'

/* Material UI Icon */
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';

import linkedinHeaderLogo from '../assets/linkedin.png';

const Header = () => {

  const [dropdown, setDropdown] = useState(false)

  const dispatch = useDispatch()

  const logoutOfApp = () => {
    dispatch(logout())

    signOut(auth)
  }

  const showDropdown = () => {
    setDropdown(!dropdown)

    setTimeout(() => setDropdown(false), 3000)
  }


  return (
    <div className="header">

        <div className="header__left">
            <img src={linkedinHeaderLogo} alt="linkedin logo" />

            <div className="header__search">
                {/* search icon */}
                <SearchIcon />

                <input type="text" placeholder='Search' />
            </div>
        </div>

        <div className="header__right">
          <HeaderOption Icon={HomeIcon} title="Home"/>
          <HeaderOption Icon={SupervisorAccountIcon} title="My Network"/>
          <HeaderOption Icon={BusinessCenterIcon} title="Jobs"/>
          <HeaderOption Icon={ChatIcon} title="Messaging"/>
          <HeaderOption Icon={NotificationsIcon} title="Notifications"/>
          <HeaderOption avatar={true} title="Me" onClick={showDropdown}/>
          {
            dropdown ? <div className='header__dropdown'>
              <button onClick={logoutOfApp}>Sign Out</button>
            </div> : ""
          }
        </div>
    </div>
  )
}

export default Header
