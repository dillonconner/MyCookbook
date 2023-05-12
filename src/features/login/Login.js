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
        const savedUser = localStorage.getItem('username');
        if(savedUser){
            setForm({username: savedUser, password: ''});
            document.getElementsByClassName('remember-box')[0].checked = true;
        }
    }, [])
    
    
    useEffect(() => {
        if(auth.user && !auth.error){
            navigate('/', {replace:true});
        }
    }, [auth.user, auth.error])
    
    const handleLoginSignUpChange = (e) => {
        isSignUp ? setIsSignUp(false) : setIsSignUp(true);
        setForm({username: '', password: ''});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(document.getElementsByClassName('remember-box')[0].checked){
            localStorage.setItem('username', form.username);
        }else {
            localStorage.removeItem('username');
        }

        if(isSignUp) {
            auth.signup(form.username, form.password);
        }else {
            auth.login(form.username, form.password);
        }
    }
    const onFormChange = (e) => setForm({...form, [e.target.name]: e.target.value});
    const handleForgotPass = (e) => {
        e.preventDefault();
        alert('Dang thats tough... Good luck remembering it');
    }

 
    return (
        <div className='login'>
            <div className='header'>
                <h1>My CookBook</h1>
            </div>
            <div className='login-form'>
                <div>
                    <h2 className='large'>Welcome Back</h2>
                    {!isSignUp ? 
                    <h2>Log In or <button className='login-type-btn' onClick={handleLoginSignUpChange}>Sign Up</button></h2>
                    :
                    <h2>Sign Up or <button className='login-type-btn' onClick={handleLoginSignUpChange}>Log In</button></h2>
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        autoFocus
                        type='text'
                        name='username'
                        value={form.username}
                        onChange={onFormChange}
                        placeholder="Username"
                        required />
                    <input 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onFormChange}
                        placeholder="Password"
                        required />
                        
                    <input className='remember-box' type='checkbox' name='rememberme' />
                    <label className='remember-label' htmlFor='rememberme'>Remember Me</label>
                    {!isSignUp && <p className='forgot-password' onClick={handleForgotPass}>Forgot Password?</p>}
                    <p className='error'>{auth.error}</p>
                    <button className='login-submit'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
                    {auth.isLoading && <img className='loading-icon' src={loadingIcon} alt='loading' />}
                </form>
            </div>
            
        </div>
    )
}
export default Login