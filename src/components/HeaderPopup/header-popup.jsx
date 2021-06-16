import React from 'react';
import { NavLink } from 'react-router-dom';
import { sidebar } from '../../data/sidebar';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';


const HeaderPopup = () => {
  return (
    <div className = 'header-popup'>
      <div className = 'header-popup__inner'>

        <div className = 'header-popup__routes'>

          <div className = 'header-popup__route'>
            <UserOutlined className = 'header-popup__image' />
            <div className = 'header-popup__name'> Профиль </div>
          </div>

          { sidebar.map((item, index) => (
            <NavLink to = {`/${item.url}`} className = 'header-popup__route' key = { index }>
              <div> { item.image } </div>
              <div className = 'header-popup__name'> { item.name } </div>
            </NavLink>
          )) }

          <div className = 'header-popup__route'>
            <LogoutOutlined className = 'header-popup__image' />
            <div className = 'header-popup__name'> Выйти </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}

export default HeaderPopup;