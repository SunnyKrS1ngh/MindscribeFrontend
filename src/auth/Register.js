import React, { useState } from 'react';
import '../styles/Register.css'; // Create this CSS file for styling
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorPopup from '../misc/ErrorPopup';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [open,setOpen] = useState(false);

    const handleError=(message)=>{
        setError(message);
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }

    const hist = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        const userData = {
            username,
            password
            
          };
      
          fetch('/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        }).then(res => {
            console.log('Response status:', res.status); // Log status code
            if (!res.ok) {
                return res.json().then(err => {
                    console.log('Error:', err.message); // Log the error message
                    handleError(err.message);
                });
            } else {
                return res.json().then(data => {
                    console.log('user registered');
                    hist.push(`/signIn`); // Redirect to dashboard
                });
            }
        }).catch(e => {
            console.error('Post error:', e);
            handleError(e);
        });
      
          // Add your fetch logic to send postData to the server here
          console.log('User created successfully:');
          // Reset form
          
    };

    return (
        <div>
            {open&&<ErrorPopup open={open} handleClose={handleClose} message={error} />}
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
        </div>
    );
};

export default Register;
