import React, { useEffect } from 'react';
import { MessageItem } from './';
import axios from 'axios';
import Typing from 'react-kr-typing-anim';

const MessageList = ({ token, quizId, messages, scrollRef, step, setStep, writingWords, setWritingWords }) => {
    useEffect(() => {
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        updateChatLog();
    }, [messages]);

    const updateChatLog = () => {
        const jsonString = JSON.stringify(messages);
        const formData = new FormData();
        formData.append('chat_log', jsonString);
        axios.patch(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) console.log('chat log is updated.'); // console.log(JSON.parse(response.data.chat_log)); 테스트 해보니 잘 파싱 됨
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="messages-list">
            {messages.map((message) =>
                <div className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
                    <MessageItem message={message} step={step} setStep={setStep} writingWords={writingWords} setWritingWords={setWritingWords} />
                    <div className='relative -bottom-5' ref={scrollRef}></div>
                </div>
            )}
        </div>
    );
};

export default MessageList;