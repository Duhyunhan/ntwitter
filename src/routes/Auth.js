import React, {useState} from 'react';
import {authService, firebaseInstance} from '../firebase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [errorList, setErrorList] = useState("");

    const onChange = (e)=>{
        //console.log(e.target.name);
        const {target:{name, value}} = e;
        if (name ==='email'){
            setEmail(value)
        }
        else if (name === 'password') {
            setPassword(value)
        }
     };

    const onSubmit = async (e)=>{
        e.preventDefault();
        let data;
        try {
            if (newAccount === true){
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                // log in
                data = await authService.signInWithEmailAndPassword(email,password)
            }
            console.log('data: ', data);
        }
        catch (error) {
            console.log(error.message);
            setErrorList(error.message);
        } 
    };
    
    // 토클버튼 작성
    const toggleAccount = () =>{setNewAccount((prev)=>(!prev))}
    const onSocialClick = async (e)=> {
        const {name} = e.target;
        //console.log(name)
        let provider
        if (name ==='google'){
            //provider = new firebaseInstance.auth.GoogleAuthProvider();
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        };

        let data = await authService.signInWithPopup(provider);
        

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='email' placeholder='email' onChange={onChange} value={email} required/>
                <input name='password' type='password' placeholder='password' onChange={onChange} value={password} required/>
                <input type='submit' value={newAccount ? 'CreateAccount' : 'Log In'}/>
                {errorList}
            </form>
            <div onClick={toggleAccount}>
                {newAccount ? 'Log In ?':'Create Account ?'}
            </div>
            <button onClick={onSocialClick} name='google'>Continue with Google</button>
        </div>
    );
}

export default Auth;