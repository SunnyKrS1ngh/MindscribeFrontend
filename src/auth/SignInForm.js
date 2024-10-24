// SignInForm.js
import { useEffect, useState } from 'react';
import '../styles/SignInForm.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorPopup from '../misc/ErrorPopup';


const SignInForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [open,setOpen] = useState(false);

    const hist = useHistory();

    const handleError=(message)=>{
        setError(message);
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token'); // Adjust if you use sessionStorage
        const userLocal = localStorage.getItem('username')
        if (token&&userLocal) {
            // If token exists, redirect to dashboard
            hist.push(`/dashboard/${userLocal}`); // Use a default username or adjust accordingly
        }
    }, [hist,username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Username:', username);
        console.log('Password:', password);

        const user = {username,password};
        
        fetch('https://mindscribebackend-tzvh.onrender.com/admin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(res => {
            console.log('Response status:', res.status); // Log status code
            if (!res.ok) {
                return res.json().then(err => {
                    console.log('Error:', err.message); // Log the error message
                    handleError(err.message);
                });
            } else {
                return res.json().then(data => {
                    console.log('User found:', data.user);
                    localStorage.setItem('token', data.token); // Store the JWT token
                    localStorage.setItem('username', data.user.username);
                    hist.push(`/dashboard/${data.user.username}`); // Redirect to dashboard
                });
            }
        }).catch(e => {
            console.error('Fetch error:', e);
            handleError(e);
        });
        
    };

    return (
        <div>
            {open&& <ErrorPopup open={open} handleClose={handleClose} message={error} />}
        <div className="sign-in-container">
            <h2 className="sign-in-title">Sign In</h2>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sign-in-btn">Sign In</button>
            </form>
        </div>
        </div>
    );
};

export default SignInForm;
