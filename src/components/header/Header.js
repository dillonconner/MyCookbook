import './Header.css';
import icon from '../../util/down_arrow.png';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import OptionsCard from '../optionsCard/OptionsCard';
import { useAuth } from '../../hooks/use-auth';


const Header = () => {

    const auth = useAuth();
    const [ showOptions, setShowOptions ] = useState(false);

    return (
        <div className='header' >
            <NavLink to='/' className='logo'>My CookBook</NavLink>
            <div className='header-right' onClick={e => setShowOptions(true)}>
                {auth.user && <p >{auth.user.username}</p> }
                <img src={icon} alt='options'/>
            </div>
            {showOptions && 
                <div className='options-container'>
                    <OptionsCard onMouseLeave={e => setShowOptions(false)} />
                </div>
            }
        </div>
    )
}

export default Header