import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionsCard.css';
import { useAuth } from '../../hooks/use-auth';

const OptionsCard = ({onMouseLeave}) => {
    
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = (e) => {
        auth.logout();
        navigate('/login');
    }

    return (
        <div className='options-card' onMouseLeave={onMouseLeave}>
            <p>Privacy</p>
            <p>Preferences</p>
            <p>blah</p>
            <p className='logout' onClick={handleLogout}>Log Out</p>
        </div>
    )
}
export default OptionsCard