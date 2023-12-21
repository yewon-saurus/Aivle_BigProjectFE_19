import React, { useState } from 'react';

import { IoSend } from "react-icons/io5";

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
            {/* TODO: 텍스트 길이 초과로 줄 바뀔 때마다, textarea가 늘어나고 줄 바꿈 되면 좋겠는데.. */}
            <input
                ref={messageFormRef}
                type="textarea"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" type="submit">
                <IoSend size={25} />
            </button>
        </form>
    );
};

export default MessageForm;