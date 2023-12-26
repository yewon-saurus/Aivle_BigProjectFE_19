import style from "./style.css";
import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

const currentRound = {
    "id": 1,
    "word": "가설",
    "meanig": "어떤 사실을 설명하",
    "solved_date": "2023-12-19 10:21:56",
    "username": "yewon",
}; // TODO: 임시 데이터.. 실제 서비스 시에는 SELECT round, solved_date, words, sentence FROM 퀴즈 WHERE round = {params.key}; 이런 식으로 받아온 데이터를 넣어주면 되겠다
const currentRound2 = {
    "id": 3,
    "word": "감안하다",
    "meanig": "감안감안하다",
    "solved_date": null,
    "username": "yewon",
};

const Main = () => {
    const params = useParams();

    const scrollRef = useRef();
    const messageFormRef = useRef();
    
    const [roundData, setRoundData] = useState(currentRound2);
    const [messages, setMessages] = useState([
        {
            text: `어서오세요.\n${params.key}단계 학습에 입장하셨습니다.`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `이번에 학습하실 단어는 "${roundData.word}" 입니다.`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `입력창에 "${roundData.word}"를 입력하시면 단어 퀴즈가 시작됩니다.`,
            isUser: false, isTyping: false, id: Date.now()
        },
    ]); // 모든 채팅 메시지 저장
    const [currentTypingId, setCurrentTypingId] = useState(null); // 현재 AI가 타이핑하는 메시지 추적

    useEffect(() => {
        modeJudge();
    }, []);

    const modeJudge = () => {
        if (params.key === undefined) {
            console.log(params.key + " main"); // TODO: latest solved word로 바로 접속 가능하도록 redirect 가능?
            // TODO: session storage에 latest solved word의 id(PK) 저장 해놓고, params.key === undefined면 아무튼 최근 문제로 nav 처리합시다
        }
        else {
            console.log(params.key + " quiz");
        }
    }

    return (
        <div className='flex'>
            <div className='w-0 lg:w-[400px] pt-[63px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList
                        currentTypingId={currentTypingId}
                        setCurrentTypingId={setCurrentTypingId}
                        messages={messages}
                        setMessages={setMessages}
                        scrollRef={scrollRef}
                        messageFormRef={messageFormRef}
                    />
                </div>
                <div className="control">
                    {/* fixed 된 프롬프트 창 + 양 방향 화살표 버튼 */}
                    {/* 프롬프트 창 */}
                    <MessageForm
                        roundData={roundData}
                        currentTypingId={currentTypingId}
                        setMessages={setMessages}
                        messageFormRef={messageFormRef}
                    />
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