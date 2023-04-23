import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header' >
            <NavLink to='/' className='logo'>My CookBook</NavLink>
            
            <div className='header-right'>
                <NavLink to=''>Home</NavLink>
                <NavLink to=''>Feed</NavLink>
                <NavLink to=''>Logout</NavLink>
            </div>
        </div>
    )
}

export default Header