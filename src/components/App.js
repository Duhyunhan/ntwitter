import React,{useState, useEffect} from 'react'
//import firebase from '../firebase'
import AppRouter from './Router'
import {authService} from '../firebase'


function App() {
  const [init, setInit] = useState(false); // authService.currentUser를 받아오는데 시간이 걸리는 데 그전에 실행을 하는 것이 문제이다. 
  //console.log('aut :', authService.currentUser);
  const [isLoggedin, setLoggedin] = useState(false);
  useEffect(() => {authService.onAuthStateChanged((user)=>{
    //console.log('user :',user);
    if (user){
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
    setInit(true);
  })});
  
  
  // useEffect(()
  //   ,[])

  return (
    
    <div className="App">
      {init ? <AppRouter isLoggedin={isLoggedin}/>: 'Initializing.....'}
      <footer> &copy; {new Date().getFullYear()} ntwitter</footer>
    </div>
  );
}

export default App;
