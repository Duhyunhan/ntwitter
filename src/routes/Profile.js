import React, { useEffect, useState } from 'react';
import {authService, dbService} from '../firebase';
import {useHistory} from 'react-router-dom';



const Profile = ({refreshUser, userId}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userId.displayName)

    const onLogoutClick = () =>{
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async ()=>{
        //const nweets = await dbService.collection('nweets').where("creatorId","==",userId.uid).orderBy('createdAt').get();
        //console.log(nweets.docs.map(doc=>doc.data()));
    }
    useEffect(()=>{
        getMyNweets()
    })

    const onChange = (e) =>{
        const {target:{value}} = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        if (userId.displayName !==newDisplayName) {
           await userId.updateProfile({
               displayName:newDisplayName,
           });
           refreshUser();
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type='text' placeholder='Display Name' value={newDisplayName}/>
                <input type='submit' value='update your profile'/>
            </form>
            <h1>Profile</h1>
            <button onClick={onLogoutClick}>Log out</button>
        </div>
    );
}

export default Profile;