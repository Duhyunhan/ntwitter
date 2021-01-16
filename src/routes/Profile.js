import React from 'react';
import {authService} from '../firebase';
import {useHistory} from 'react-router-dom';



const Profile = () => {
    const history = useHistory();

    const onLogoutClick = () =>{
        authService.signOut();
        history.push("/");

    }
    return (
        <div>
            <h1>Profile</h1>
            <button onClick={onLogoutClick}>Log out</button>
        </div>
    );
}

export default Profile;