import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ({userId}) =>{
    return (
        <span>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Profile">{userId.displayName}의 프로파일</Link></li>
            </ul>
        </span>
    )
}

export default Navigation;