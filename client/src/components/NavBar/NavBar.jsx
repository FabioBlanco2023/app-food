import React from "react";
import { useLocation, NavLink } from 'react-router-dom';
import './Navbar.css';
import {IoIosAdd} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'


const getActiveClass = (path, currentPath) => {
    return path === currentPath ? 'active' : '';
  };
  
  const NavBar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
  
    
    return (
        <>
            <header>
            <nav>
            <div className="rectangulo">
            <ul>
            <h1 className='LandingH1'>FOOD APP </h1>
            <li className={getActiveClass('/', currentPath)}>
            <NavLink  exact to="/">Landing</NavLink >
            </li>
            <li className={getActiveClass('/home', currentPath)}>
            <NavLink  exact to="/home">Home <AiFillHome/> </NavLink >
            </li>
            <li className={getActiveClass('/create', currentPath)} >
            <NavLink  exact to = '/create'>Create Recipe<IoIosAdd/></NavLink >
            </li>
            </ul>
            </div>
            </nav>
            </header>
        </>
        )

}

export default NavBar;