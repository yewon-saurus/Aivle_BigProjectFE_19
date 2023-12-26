import React, { useEffect } from 'react';
import Typing from 'react-kr-typing-anim';

const MessageList = ({ messages, scrollRef }) => {
    useEffect(() => {
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    return (
        <div className="messages-list">
            {messages.map((message) =>
                <div
                    key={message.id}
                    className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
                >
                    {message.text}
                    <div className='relative -bottom-5' ref={scrollRef}></div>
                </div>
            )}
        </div>
    );
};

export default MessageList;