import React, { useState } from 'react';

const MessageForm = ({ setMessages, messageFormRef }) => {
    const [message, setMessage] = useState('');
    
    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true }, // 사용자의 메시지
            { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() }, // AI의 응답(임시)
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSendMessage(message);
        setMessage('');
    };
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                ref={messageFormRef}
                type="text"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input className="send-button" type="submit" value={"send"} />
        </form>
    );
};

export default MessageForm;