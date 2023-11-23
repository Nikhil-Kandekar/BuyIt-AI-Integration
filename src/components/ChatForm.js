import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {FiSend} from 'react-icons/fi';
import '../App.css';


function ChatForm(props){
    const [input, setInput] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = async(e) =>{ 
        await setInput(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()        

        props.onSubmit({
            text : input
        })
        setInput('')
    }

    return(
        <form className = "chat-bar-input-block" onSubmit = {handleSubmit}>
            <div id = "userType">
                <input id = "textInput" className = "input-box" type = "text" name = "meg" placeholder = "Tap 'Enter' to send a Message" onChange= {handleChange} ref = {inputRef} value={input} />
            </div>

            <div className = "chat-bar-icons" onClick={handleSubmit}>
                <FiSend />
            </div>
        </form>
    )
}

export default ChatForm;