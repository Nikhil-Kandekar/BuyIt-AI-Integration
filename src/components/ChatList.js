import React, {useEffect, useState} from 'react';
import ChatForm from './ChatForm';
import {FcFaq} from 'react-icons/fc';
import {AiOutlineClose} from 'react-icons/ai';
import '../App.css';
import axios from 'axios';


function ChatList(){

    const [chats, setChats] = useState([])
    const [close, setClose] = useState(0);

    const handleClose = () =>{
        if(close===0){
            setClose(1);
        }else{
            setClose(0);
        }
    }

    
    const addChat = chat =>{  
        var recievedresponse;       
        axios.get(`http://127.0.0.1:8001/postquestion?sentence=${chat.text}`).then((res)=>{
            recievedresponse = res.data.message
            console.log(recievedresponse)
            setChats([...chats,
                {"id":1,"message": chat.text},
                {"id":0,"message":recievedresponse}
            ])
            setChats([...chats,
                {"id":1,"message": chat.text},
                {"id":0,"message":recievedresponse}
            ])
            console.log("Final",chats)
        })        
        
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/')
             .then((res)=>{
                setChats([{"id":0,"message":res.data.message}])
        })
    },[])
    


    return(
        <div className = "chat-bar-collapsible">
            
            <button id ="chat-button" type = "button" className="collapsible" onClick={handleClose} float="right">
                BuyIt Bot 
                <FcFaq />
                <AiOutlineClose color='white' onClick = {handleClose} class = "close-button"/>

                
            </button>

            <div className = "content" id= {close ? "open" : "close"}>
                <div className = "full-chat-block">
                    <div className = "outer-container">
                        <div className = "chat-container">
                            <div id = "chatbox">
                                {chats.map((chat,index)=>(
                                    <p className={chat.id?'userText':'botText'} key ={index}>
                                        <span>{chat.message}</span>
                                    </p>
                                ))}                                
                            </div>

                            <ChatForm onSubmit = {addChat}/>
                        
                            <div id = "chat-bar-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatList;