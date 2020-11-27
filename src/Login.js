import React from 'react';
import { Button } from '@material-ui/core';
import './styles/Login.css';
import db, { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            }); 
            if(result.additionalUserInfo.isNewUser){
                db.collection('users').add({
                    name: result.user.displayName,
                    displayImage: result.user.photoURL
                });
            }
        })
        .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in to Chat App</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login;
