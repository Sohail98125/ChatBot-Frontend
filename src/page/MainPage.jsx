import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import './MainPage.css'
import { useState } from 'react'
const MainPage = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const bottomRef = useRef(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!query.trim()) return;
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/search?query=${encodeURIComponent(query)}`,  { timeout: 8000 })
            setMessages((prev) => [...prev, {
                user: query,
                bot: response.data.message
            }])
            setQuery('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    return (
        <div className='main-page'>
            <div className='chat-header'>
                <div className='bot-name'>
                    <button onClick={()=>{setMessages([]);setQuery('')}}>ChatIFY</button>
                </div>
                <div className='bot-logo'>☸</div>
            </div>
            {/* <hr /> */}
            <main className='main-content'>
                {!messages.length && !loading && <div className='empty-chat'>
                    <p>Hey, nice to see you. What's new?</p>
                    </div>}
                {messages.map((message, index) => (
                    <div key={index} className='message'>
                            <p className="user-msg">{message.user}:👨🏻‍💼</p>
                            <p className="bot-msg">⚙️:{message.bot}</p>
                    </div>
                ))}
                {loading && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                <div ref={bottomRef}></div>
            </main>
            <form className='form-input' onSubmit={handleSubmit}>
                <input type="text" placeholder='Ask Anything...' value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type='submit'>SEND</button>
            </form>
        </div>
    )
}

export default MainPage