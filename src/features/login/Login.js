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
    }, [auth.user, auth.error])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp) {
            auth.signup(form.username, form.password);
        }else {
            auth.login(form.username, form.password);
        }
    }
    const onFormChange = (e) => setForm({...form, [e.target.name]: e.target.value});
    const handleForgotPass = (e) => {
        alert('Dang thats tough... Good luck remembering it');
    }
    const handleRememberChange = (e) => {
        if(e.target.checked){
            //make keep jwt
        }else {
            //make not keep jwt
        }
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
                    <h2>Log In or <button className='login-type-btn' onClick={e => setIsSignUp(true)}>Sign Up</button></h2>
                    :
                    <h2>Sign Up or <button className='login-type-btn' onClick={e => setIsSignUp(false)}>Log In</button></h2>
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
                        
                    <input className='remember-box' type='checkbox' name='rememberme' onChange={handleRememberChange} />
                    <label className='remember-label' htmlFor='rememberme'>Remember Me</label>
                    <button className='forgot-password' onClick={handleForgotPass}>Forgot Password?</button>
                    <p className='error'>{auth.error}</p>
                    <button className='login-submit'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
                    {auth.isLoading && <img className='loading-icon' src={loadingIcon} alt='loading' />}
                </form>
            </div>
            
        </div>
    )
}
export default Login