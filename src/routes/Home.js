import React,{useEffect, useState} from 'react';
import { dbService, storageService } from '../firebase';
import {v4 as uuidv4} from 'uuid'

import Nweets from '../components/Nweets'

const Home = ({userId}) => {
    //console.log('a',userId)
    const [ntweet, setNtweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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
        });// -------------------------------------------------------------------> 구식방법이라고 하네 
    }
                
    useEffect(()=>{
        //getNweets();  -----> 구식방법
        dbService.collection('nweets').onSnapshot((snapshot)=>{
            const nweetArray = snapshot.docs.map((doc)=>({
                id:doc.id, 
                ...doc.data()
            }));
            //console.log(nweetArray);
            setNweets(nweetArray);
        });
    },[]);

    //dbNweets.forEach((document)=>console.log(document))

    const onSubmit = async (e)=>{
        e.preventDefault();
        let attachmentURL  = '';
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userId.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,'data_url');
            attachmentURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: ntweet,
            createdAt : Date.now(), 
            creatorId : userId.uid,   ////id 받아오기
            attachmentURL
        };
        await dbService.collection('nweets').add(
    //         {text: ntweet,
    //         createdAt : Date.now(), 
    //          creatorId : userId.uid,   ////id 받아오기
       // }
            nweetObj
    );
         setNtweet(''); // data 초기화 
         setAttachment();
    }
    const onChange = (e) =>{
        const {value} = e.target;
        setNtweet(value);
        
    }
    //console.log(nweets);


    const onFileChange = (event)=>{
        //console.log(event.target.files)
        const {target:{files}} = event;
        const thefile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishload=>{
            console.log(finishload)
            const {currentTarget:{result}} = finishload;
            setAttachment(result)
        });//event listner
        reader.readAsDataURL(thefile);

    }

    const onClearAttachment = () => {
        setAttachment(null);
    }

    return (
        <div>
            <h1>Home</h1>

            <form onSubmit={onSubmit}>
                <input value={ntweet} onChange={onChange} type='text' placeholder='write anything..............' maxLength='120' />
                <input type='submit' value='nweet'/>
                <input type='file' accept='image/*' onChange={onFileChange}/>
                {attachment && 
                    <div>
                        <img src={attachment} width='50px' height='50px'/>
                        <button onClick={onClearAttachment}>Cancel upload</button>
                        <button>Upload</button>
                    </div>}
            </form>
            <div>
                {nweets.map((nweet)=>(
                    //console.log(nweet.id),
                    <Nweets key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userId.uid}></Nweets>
                )
                    //console.log(nweet)
                )}
            </div>
        </div>
    );
}

export default Home;