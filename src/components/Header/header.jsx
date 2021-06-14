import React from 'react';
import cls from 'classnames';
import { Switch, Badge, Avatar, Button } from 'antd';
import { BellOutlined, UserOutlined, DownOutlined, UnorderedListOutlined } from '@ant-design/icons';

import ProfilePopup from '@components/ProfilePopup/profile-popup';

import logo from '../../assets/mini_logo.svg';
import HeaderPopup from '@components/HeaderPopup/header-popup';



const Header = () => {
  const popupRef = React.useRef();
  const toggleRef = React.useRef();

  const [ visiblePopup, setVisiblePopup ] = React.useState(false);
  const [ visibleHeaderPopup, setVisibleHeaderPopup ] = React.useState(false);


  const handleVisiblePopup = () => {
    setVisiblePopup((prevState) => !prevState);
  }

  const handleHeaderVisiblePopup = () => {
    setVisibleHeaderPopup((prevState) => !prevState);
  }

  const handleOutsideClick = (event) => {
    let path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(popupRef.current) && !path.includes(toggleRef.current)) {
      setVisiblePopup(false);
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    }
  }, [])


  return (
    <div className = 'header'>
      <div className = 'header__inner'>
        <img className = 'header__logo' src = { logo } alt = '' />

        <Button onClick = { handleHeaderVisiblePopup } type = 'primary' className = 'header__button'> <UnorderedListOutlined /> </Button>
        { visibleHeaderPopup &&  <HeaderPopup />}

        <div className = 'header__content'>
          <Switch  defaultChecked className = 'switch'/>
          <div className = 'header__site'> devel.kz </div>

          <Badge count = {1} className = 'badge'>
            <BellOutlined />
          </Badge>

          <div className = 'header__user' onClick = { handleVisiblePopup } ref = { toggleRef }>
            <Avatar size = 'large' className = 'avatar' icon = { <UserOutlined /> }/>
            <div className = 'header__user-name'> Нурлан  А. </div>
            <DownOutlined className = {cls('header__toggle', { 'active': visiblePopup })} />

            <div ref = { popupRef }>
              {visiblePopup && <ProfilePopup />}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header;