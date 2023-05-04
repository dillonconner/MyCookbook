import './Login.css';
import React, { useState } from "react";
import { baseUrl } from "../../util/apiConfig";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState({username: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = isSignUp ? `${baseUrl}/user/signup` : `${baseUrl}/user/login`;
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: form.username, password: form.password})
            }).then(response => response.json());
            
            if(resp.success) {
                localStorage.setItem('token', resp.token);
                navigate('/', {replace: true});
            }
            else {
                alert('invalid username or password')
                console.log(resp);
            }
        } catch(err) {
            alert(err);
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