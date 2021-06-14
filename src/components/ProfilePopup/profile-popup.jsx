import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';


const ProfilePopup = () => {
  return (
    <div className = 'profile-popup'>
      <div className = 'profile-popup__inner'>
        <div className = 'profile-popup__routes'>
          <UserOutlined className = 'profile-popup__icon' />
          <div className = 'profile-popup__name'> Профиль </div>
        </div>

        <div className = 'profile-popup__routes'>
          <LogoutOutlined className = 'profile-popup__icon' />
          <div className = 'profile-popup__name'> Выйти </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePopup;