import React, { useEffect } from 'react';
import { MessageItem } from './';
import { useSelector } from 'react-redux';
import httpRequest from '../../../network/request';

const MessageList = ({ scrollRef }) => {
    const quizId = useSelector((state) => state.quiz.quizId);
    const step = useSelector((state) => state.quiz.step);
    const messages = useSelector((state) => state.quiz.messages);
    
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        if ((step !== -1) && (step !== 501)) updateChatLog();
    }, [messages]);

    const updateChatLog = () => {
        const jsonString = JSON.stringify(messages);
        const formData = new FormData();
        formData.append('chat_log', jsonString);
        httpRequest('PATCH', `/study/quiz/${quizId}/`, formData).catch(error => {
            console.error(error);
        });
    }

    const judgeChatStyle = (message) => {
        if (message.mode === 'reEnter') return 'guide-re-enter';
        else {
            if (message.isUser) return 'user-message';
            else return 'ai-message';
        }
    }

    return (
        <div className="messages-list">
            {messages.map((message, idx) =>
                <div className={`message ${judgeChatStyle(message)}`}>
                    <MessageItem key={'message_item_' + idx}
                        message={message} quizId={quizId} />
                    <div className='relative -bottom-5' ref={scrollRef}></div>
                </div>
            )}
        </div>
    );
};

export default MessageList;