import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () =>{
    return (
        <span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Profile">My Profile</Link></li>
            </ul>
        </span>
    )
}

export default Navigation;