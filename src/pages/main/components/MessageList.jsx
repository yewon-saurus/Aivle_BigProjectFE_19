import React, { useState, useEffect } from 'react';
import Typing from 'react-kr-typing-anim';

const MessageList = ({ messages, setMessages, scrollRef, messageFormRef }) => {
    const [currentTypingId, setCurrentTypingId] = useState(null); // 현재 AI가 타이핑하는 메시지 추적

    useEffect(() => {
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    useEffect(() => {
        if (currentTypingId === null) {
            const nextTypingMessage = messages.find (
                (msg) => !msg.isUser && msg.isTyping
            );
            if (nextTypingMessage) {
                setCurrentTypingId(nextTypingMessage.id);
            }
            messageFormRef.current.focus(); // AI의 응답이 끝난 후 입력창으로 자동 포커싱
        }
    }, [messages, currentTypingId]);

    const handleEndTyping = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === id ? { ...msg, isTyping: false } : msg
            )
        );
        setCurrentTypingId(null); // 타이핑 애니메이션 종료됐다? -> 더 이상 타이핑 중인 메시지가 없다
    };

    return (
        <div className="messages-list">
        {messages.map((message) =>
        message.isTyping && message.id === currentTypingId ? (
            <pre className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}>
                <Typing key={message.id} Tag='pre' speed={50} onDone={() => handleEndTyping(message.id)}>
                    {message.text}
                </Typing>
                <div ref={scrollRef}></div>
            </pre>
        ) : (
            <pre
                key={message.id}
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
                {message.text}
                <div ref={scrollRef}></div>
            </pre>
        )
        )}
    </div>
    );
};

export default MessageList;