/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import '../Css/headerOption.css'
import { Avatar } from '@mui/material';
import { selectUser } from '../features/userSlice';

function HeaderOption({avatar, Icon, title, onClick}) {

  const user = useSelector(selectUser)

  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon  className="headerOption__icon"/>}
      {avatar && <Avatar className="hederOption__icon" src={user?.photoURL}>{user?.email[0]}</Avatar>}
      <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption
