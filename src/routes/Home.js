import React,{useEffect, useState} from 'react';
import { dbService } from '../firebase';

const Home = () => {

    const [ntweet, setNtweet] = useState('');
    const [nweets, setNweets] = useState([]);

    // db데이타를 가져오는 함수 
    const getNweets = async ()=>{
        const dbNweets = await dbService.collection('nweets').get();
        dbNweets.forEach((document)=>{
            const nweetObject = {
                ...document.data(),
                id : document.id
            }
            //console.log(document.data())
            setNweets((prev)=>[nweetObject,...prev])
        });
    }
                
            
        
    
    
    useEffect(()=>{getNweets();},[]);

    //dbNweets.forEach((document)=>console.log(document))

    const onSubmit = async (e)=>{
        e.preventDefault();

       await dbService.collection('nweets').add({
            tweet: ntweet,
            createdAt : Date.now(),
        });
        setNtweet(''); // data 초기화 
    }
    const onChange = (e) =>{
        const {value} = e.target;
        setNtweet(value);
        
    }
    console.log(nweets);
    return (
        <div>
            <h1>Home</h1>

            <form onSubmit={onSubmit}>
                <input value={ntweet} onChange={onChange} type='text' placeholder='write anything..............' maxLength='120' />
                <input type='submit' value='nweet'/>
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <div key={nweet.id}>
                        <h1>{nweet.tweet}</h1>
                    </div>
                )
                    //console.log(nweet)
                )}
            </div>
        </div>
    );
}

export default Home;