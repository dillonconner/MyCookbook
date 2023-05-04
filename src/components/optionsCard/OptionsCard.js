import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionsCard.css';

const OptionsCard = ({onMouseLeave}) => {
    
    const navigate = useNavigate();

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='options-card' onMouseLeave={onMouseLeave}>
            <ul name='settings'>
                <li>Privacy</li>
                <li>Preferences</li>
                <li>blah</li>
            </ul>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}
export default OptionsCard