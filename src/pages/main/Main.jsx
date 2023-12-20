import style from "./style.css";
import React, {useState, useEffect} from 'react';
import Typing from 'react-kr-typing-anim';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

const Main = () => {
    const [messages, setMessages] = useState([]); // 모든 채팅 메시지 저장
    const [currentTypingId, setCurrentTypingId] = useState(null); // 현재 AI가 타이핑하는 메시지 추적

    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true }, // 사용자의 메시지
            { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() }, // AI의 응답(임시)
        ]);
    };

    const handleEndTyping = (id) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === id ? { ...msg, isTyping: false } : msg
            )
        );
        setCurrentTypingId(null); // 타이핑 애니메이션 종료됐다? -> 더 이상 타이핑 중인 메시지가 없다
    };

    useEffect(() => {
        if (currentTypingId === null) {
            const nextTypingMessage = messages.find (
                (msg) => !msg.isUser && msg.isTyping
            );
            if (nextTypingMessage) {
                setCurrentTypingId(nextTypingMessage.id);
            }
        }
    }, [messages, currentTypingId]);

    const MessageList = ({ messages, currentTypingId, onEndTyping }) => (
        <div className="messages-list">
            {messages.map((message) =>
            message.isTyping && message.id === currentTypingId ? (
                <div className={message.isUser ? 'user-message' : 'ai-message'}>
                    <Typing key={message.id} Tag='div' speed={50} onDone={() => onEndTyping(message.id)}>
                        {message.text}
                    </Typing>
                </div>
            ) : (
                <div
                    key={message.id}
                    className={message.isUser ? 'user-message' : 'ai-message'}
                >
                    {message.text}
                </div>
            )
            )}
        </div>
    );

    const MessageForm = ({ onSendMessage }) => {
        const [message, setMessage] = useState('');
        
        const handleSubmit = (event) => {
            event.preventDefault();
            onSendMessage(message);
            setMessage('');
        };
        
        return (
            <form className="message-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" type="submit">
                Send
            </button>
            </form>
        );
    };
    
    return (
        <div className='flex'>
            <div className='w-0 lg:w-[400px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList
                        messages={messages}
                        currentTypingId={currentTypingId}
                        onEndTyping={handleEndTyping}
                    />
                </div>
                <div>
                    {/* 양 방향 화살표 버튼 + fixed 된 프롬프트 창 */}
                    <div>
                        {/* 양 방향 화살표 버튼(이전 회차, 다음 회차) */}
                        <div>⬅️</div>
                        <div>➡️</div>
                    </div>
                    <div>
                        {/* 프롬프트 창 */}
                        <MessageForm onSendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;