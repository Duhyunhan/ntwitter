import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile'
import Navigation from './Navigation';

const AppRouter = ({refreshUser,isLoggedin, userId}) => {
    return(
        <Router>
            {isLoggedin && <Navigation userId={userId}/>}
            <Switch>
                {isLoggedin ? (
                <>
                    <Route exact path='/'>
                        <Home userId={userId}></Home>
                    </Route>
                    <Route exact path='/Profile'>
                        <Profile userId={userId} refreshUser={refreshUser}></Profile>
                    </Route>
                </> ): (
                    <Route exact path='/'>
                        <Auth></Auth>
                    </Route>
                )}
            </Switch> 
        </Router>
    )

}

export default AppRouter;