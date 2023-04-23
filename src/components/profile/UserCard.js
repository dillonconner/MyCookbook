import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = () => {
    
    return (
        <div className='user-card'>
            <img src='https://www.clipartmax.com/png/small/439-4395917_empty-profile.png' alt='profile'/>
            <h3>Dillon Conner</h3>
            <label htmlFor='bio'>Bio</label>
            <p name='bio'>;;safnf;sdfjwenf;oefewnf;oewhfwn f;owhf;jw nef;jshdv;nsf ;jn;ovewfn ;odhvwenfg;dhv jwangf;shva jwngf;s</p>
            <label htmlFor='settings'>Settings</label>
            <ul name='settings'>
                <li>Privacy</li>
                <li>Preferences</li>
                <li>blah</li>
            </ul>
            <Link className='new-recipe-btn' to='new-recipe'>New Recipe</Link>
        </div>
    )
}
export default UserCard