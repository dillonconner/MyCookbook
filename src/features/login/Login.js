import React, { useState } from "react";
import { baseUrl } from "../../util/apiConfig";
import { Link, useNavigate } from "react-router-dom";


const Login = ({isSignUp}) => {

    const navigate = useNavigate();
    const [form, setForm] = useState({username: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let resp = undefined;
            if(isSignUp) {
                resp = await fetch(`${baseUrl}/user/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: form.username, password: form.password})
                }).then(response => response.json());
            }
            else {
                resp = await fetch(`${baseUrl}/user/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: form.username, password: form.password})
                }).then(response => response.json());
            }
            if(resp.success) {
                localStorage.setItem('token', resp.token);
                navigate('/', {replace: true});
            }
            else {
                alert('invalid username or password')
            }

        } catch(err) {
            alert(err);
        }

    }

    const onFormChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {!isSignUp ? 
                <h2>Log In or <Link to='../signup'>Sign Up</Link></h2>
                :
                <h2>Sign Up</h2>
                }
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
                <button>{isSignUp ? 'Sign Up' : 'Log In'}</button>
            </form>
        </div>
    )
}
export default Login