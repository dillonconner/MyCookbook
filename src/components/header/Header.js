import './Header.css';
import icon from '../../util/profile-icon.png';

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
            <div className='header-right'>
                {auth.user && <p>{auth.user.username}</p> }
                <img src={icon} alt='options' onClick={e => setShowOptions(true)}/>
                {showOptions && <OptionsCard onMouseLeave={e => setShowOptions(false)} />}
            </div>
        </div>
    )
}

export default Header