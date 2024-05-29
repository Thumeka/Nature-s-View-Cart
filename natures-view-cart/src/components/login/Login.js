import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // redirect to home page
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const register = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // create a user, login and redirect to homepage
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="login">
            <Link to="/">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/Nature_View_Cart_Logo.png?alt=media&token=6f936b43-3d7a-48d6-be89-f58e084eb213" 
                    alt="Nature's View Cart Logo" 
                    className="login__logo" 
                />
            </Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>Email:</h5>
                    <input 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        type="email" 
                    />

                    <h5>Password:</h5>
                    <input 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password" 
                    />

                    <button 
                        type="submit" 
                        onClick={signIn}  
                        className="login__signInBtn"
                    >
                        Sign in
                    </button>
                    <p>
                        By signing in you agree to Nature's View Cart's conditions of use and sale. Please see our privacy notice, our cookies notice, and our interest-based ad notice.
                    </p>
                    <button 
                        onClick={register} 
                        className="login__registerBtn"
                    >
                        Create your Nature's View Cart account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
