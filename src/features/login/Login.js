import './Login.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/use-auth';
import loadingIcon from '../../util/Loading_icon.gif';

const Login = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState({username: '', password: ''});

    useEffect(() => {
        if(auth.user && !auth.error){
            navigate('/home', {replace:true});
        }
    }, [auth.user])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            auth.signup(form.username, form.password);
        }else {
            auth.login(form.username, form.password);
        }
    }

    const onFormChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
        <div className='login'>
            <h1>My CookBook</h1>
                {!isSignUp ? 
                <h2>Log In or <button className='login-type-btn' onClick={e => setIsSignUp(true)}>Sign Up</button></h2>
                :
                <h2>Sign Up or <button className='login-type-btn' onClick={e => setIsSignUp(false)}>Log In</button></h2>
                }
            <form onSubmit={handleSubmit}>
                <input 
                    autoFocus
                    type='text'
                    name='username'
                    value={form.username}
                    onChange={onFormChange}
                    placeholder="username"
                    required />
                <input 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onFormChange}
                    placeholder="password"
                    required />
                <button className='login-submit'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
                {auth.error && <p>{auth.error}</p>}
                {auth.isLoading && <img src={loadingIcon} alt='loading' />}
            </form>
            <div className='delete'>
                <p>testuser   password</p>
                <p>uniquetest   password</p>
                <p>dillonconner   rhodes234</p>
            </div>
            
        </div>
    )
}
export default Login