import { Avatar } from '@mui/material'
import '../Css/sidebar.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

import linkedInBanner from '../assets/linkedin_banner.jpg';

const Sidebar = () => {

  const user = useSelector(selectUser)


  const recentItem = (topic) => {
    return (
      <div className="sidebar__recentItem">
        <span className='sidebar_hash'>#</span>
        <p>{topic}</p>
      </div>
    )
  }


  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={linkedInBanner} alt="background image" />
        <Avatar className='sidebar__avatar' src={user.photoURL}>{user.email[0]}</Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
            <p>Profile viewers</p>
            <p className='sidebar__statNumber'>1,205</p>
        </div>
        <div className="sidebar__stat">
            <p>Post views</p>
            <p className='sidebar__statNumber'>3,765</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem('reactjs')}
        {recentItem('javascript')}
        {recentItem('python')}
        {recentItem('softwareenginnering')}
        {recentItem('design')}
      </div>
    </div>
  )
}

export default Sidebar