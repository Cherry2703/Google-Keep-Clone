import React from 'react';

import { useNavigate } from 'react-router-dom';

import { IoMdMenu } from "react-icons/io";
import { SiGooglekeep } from "react-icons/si";
import { MdOutlineRefresh } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { PiSquaresFour } from "react-icons/pi";

import { CiLight } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";


import Cookies from 'js-cookie'

import './index.css';

const Navbar = ({ toggleSidebar, onChangeSearchInput, activeTheme, changeTheme }) => {

  const navigate = useNavigate()

//refresh the page function 
  const onClickRefreshBtn = () =>{
    window.location.reload()
  }

  const onClickLogoutBtn = () =>{
    Cookies.remove('jwtToken')
    navigate('/login')
  }

  return (
    <div className={`navbar-container ${activeTheme ? 'light-theme' : 'dark-theme'}`}>
      <div className="navbar-each-cont logo-container">
        <span className="menu-icon" onClick={toggleSidebar}><IoMdMenu /></span>
        <div className="logo-cont">
          <span className="logo-icon"><SiGooglekeep /></span>KEEP
        </div>
      </div>

      <div className="navbar-each-cont search-container">
        <input
          type="search"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => onChangeSearchInput(e.target.value)}
        />
      </div>

      <div className="navbar-each-cont">
        <div className="settings-cont">
          <span className="search"><FaSearch /></span>
          <span onClick={()=>onClickRefreshBtn()}><MdOutlineRefresh /></span>
          <span onClick={changeTheme}>
            {activeTheme ? <IoMoonOutline /> : <CiLight />}
          </span>
          <span><PiSquaresFour /></span>
          <span><IoMdSettings /></span>
        </div>
        <div className="profile-cont">
          <span onClick={()=>onClickLogoutBtn()}><IoMdLogOut/></span>
          <span><CgProfile /></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
