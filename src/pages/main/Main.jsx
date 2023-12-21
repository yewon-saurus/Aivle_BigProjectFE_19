import style from "./style.css";
import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

const Main = () => {
    const params = useParams();
    if (params.key === undefined) console.log(params.key + " main"); // TODO: latest round로 바로 접속 가능하도록 redirect 가능?
    else console.log(params.key + " quiz");

    const scrollRef = useRef();
    const messageFormRef = useRef();

    const currentRound = {
        "round": 1,
        "solved_date": "2023-12-19 10:21:56",
        "words": ["있으매", "마음", "놓다", "인생", "하늘"],
        "sentence": "네가 있으매 마음이 놓인다.",
    }; // TODO: 임시 데이터.. 실제 서비스 시에는 SELECT round, solved_date, words, sentence FROM 퀴즈 WHERE round = {params.key}; 이런 식으로 받아온 데이터를 넣어주면 되겠다

    const [roundData, setRoundData] = useState(currentRound);
    const [messages, setMessages] = useState([
        { text: `어서오세요. ${params.key}회차 학습에 입장하셨습니다.\n\n${params.key}회차에서 학습 할 단어는\n[${roundData.words.map(word => ' ' + word)} ]\n입니다.`,
        isUser: false, isTyping: true, id: Date.now() },
    ]); // 모든 채팅 메시지 저장
    
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
                    {/* 프롬프트 창 */}
                    <MessageForm setMessages={setMessages} messageFormRef={messageFormRef} />
                    {/* <div> */}
                        {/* 양 방향 화살표 버튼(이전 회차, 다음 회차) */}
                        {/* <div>⬅️</div> */}
                        {/* <div>➡️</div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Main;