import React, {useState} from 'react'
import { dbService, storageService } from '../firebase';

const Nweets = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const toggleEditting = () => {
        setEditing(prev=>!prev);// 전에값이 false였으므로 다음에는 true로 바뀌게 된다. 
    }

    const onChange = (e)=>{
        e.preventDefault()
        const {target:{value}} = e;
        setNewNweet(value)
    }
    const onSubmit =(e)=>{
        e.preventDefault();
        console.log(nweetObj);
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        })
        setEditing(prev=>!prev);
    }


    const onDeleteClick = () => {
        const ok = window.confirm("Do you want to Delte???");
        if (ok) {
            dbService.doc(`nweets/${nweetObj.id}`).delete();
            storageService.refFromURL(nweetObj.attachmentURL).delete();
        }       
    }
    return (
        console.log('??',nweetObj),
        //console.log('nn'),
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type='text' onChange={onChange} value={newNweet}></input>
                            <input type='submit' value='Update Nweet'></input>
                        </form>
                        <button  onClick={toggleEditting}>Cancel</button>
                    </>  
                        ) :
                        (<>
                            {nweetObj.attachmentURL && (
                                <img src={nweetObj.attachmentURL} width='50px' height='50px'/>
                                )}
                            <h3>{nweetObj.text}</h3>
                            {isOwner && 
                            <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditting}>Edit</button>
                            </>} 
                        </>) 
            }
        </div>
    )
}

export default Nweets;