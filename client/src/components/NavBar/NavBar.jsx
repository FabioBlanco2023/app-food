import React from "react";
import {Link, useLocation, NavLink } from 'react-router-dom';
import './Navbar.css';
import SearchBar from "../SearchBar/SearchBar";
import {IoIosCreate} from 'react-icons/io'
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
            <div className="rectangulo">
            <h1 className='LandingH1'>RECIPE</h1>
            <nav>
            <ul>
            <li className={getActiveClass('/', currentPath)}>
            <NavLink  exact to="/">Landing</NavLink >
            </li>
            <li className={getActiveClass('/home', currentPath)}>
            <NavLink  exact to="/home">Home <AiFillHome/> </NavLink >
            </li>
            <li className={getActiveClass('/create', currentPath)} >
            <NavLink  exact to = '/create'>Create Recipe<IoIosCreate/> </NavLink >
            </li>
            </ul>
            </nav>
            </div>
            </header>

        </>
        )

}

export default NavBar;