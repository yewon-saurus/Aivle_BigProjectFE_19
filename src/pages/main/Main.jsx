import style from "./style.css";
import React, {useState, useEffect, useRef} from 'react';
import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

const Main = () => {
    const scrollRef = useRef();
    const messageFormRef = useRef();

    const [messages, setMessages] = useState([{ text: `어서오세요. ${'반가워요.'}`, isUser: false, isTyping: true, id: Date.now() }]); // 모든 채팅 메시지 저장
    
    return (
        <div className='flex'>
            <div className='w-0 lg:w-[400px] pt-[63px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList
                        messages={messages}
                        setMessages={setMessages}
                        scrollRef={scrollRef}
                        messageFormRef={messageFormRef}
                    />
                </div>
                <div className="control">
                    {/* fixed 된 프롬프트 창 + 양 방향 화살표 버튼 */}
                    <div>
                        {/* 프롬프트 창 */}
                        <MessageForm setMessages={setMessages} messageFormRef={messageFormRef} />
                    </div>
                    <div>
                        {/* 양 방향 화살표 버튼(이전 회차, 다음 회차) */}
                        <div>⬅️</div>
                        <div>➡️</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;