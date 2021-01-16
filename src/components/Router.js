import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile'
import Navigation from './Navigation';

const AppRouter = ({isLoggedin}) => {
    return(
        <Router>
            {isLoggedin && <Navigation/>}
            <Switch>
                {isLoggedin ? (
                <>
                    <Route exact path='/'>
                        <Home></Home>
                    </Route>
                    <Route exact path='/Profile'>
                        <Profile></Profile>
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