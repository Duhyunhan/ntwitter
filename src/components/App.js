import React,{useState, useEffect} from 'react'
//import firebase from '../firebase'
import AppRouter from './Router'
import {authService} from '../firebase'


function App() {
  const [init, setInit] = useState(false); // authService.currentUser를 받아오는데 시간이 걸리는 데 그전에 실행을 하는 것이 문제이다. 
  //console.log('aut :', authService.currentUser);
  const [isLoggedin, setLoggedin] = useState(false);

  //user id 
  const [userId, setUserId] = useState(null);

  useEffect(() => {authService.onAuthStateChanged((user)=>{
    //console.log('user :',user);
    if (user){
      setLoggedin(true);
      setUserId(user);
    } else {
      setLoggedin(false);
    }
    setInit(true);
  })});
  
  const refreshUser= () =>{
    setUserId(authService.currentUser.displayName)
  }
  return (
    
    <div className="App">
      {init ? <AppRouter refreshUser={refreshUser} isLoggedin={isLoggedin} userId={userId}/>: 'Initializing.....'}
      <footer> &copy; {new Date().getFullYear()} ntwitter</footer>
    </div>
  );
}

export default App;
