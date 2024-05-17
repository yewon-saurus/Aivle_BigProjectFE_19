import style from "./style.css";
import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

import { useSelector, useDispatch } from "react-redux";
import {
    changeAiTalking,
    updateQuizId,
    updateWord,
    updateQuiz,
    updateMessages,
    importPrevQuiz,
} from "../../redux/modules/quiz";

const Main = () => {
    const token = sessionStorage.getItem('aivle19_token');

    const params = useParams();

    const dispatch = useDispatch();
    const quizId = useSelector((state) => state.quiz.quizId);
    const step = useSelector((state) => state.quiz.step);
    const word = useSelector((state) => state.quiz.word);
    const quiz = useSelector((state) => state.quiz.quiz);
    const messages = useSelector((state) => state.quiz.messages);

    const scrollRef = useRef();
    const messageFormRef = useRef();
    
    const [createQuizDidMount, setCreateQuizDidMount] = useState(false);
    
    useEffect(() => {
        if (params.key === undefined) {
            // 새 문제 생성, 저장
            setCreateQuizDidMount(true);
        }
        else {
            // 전에 풀던/풀이 완료한 문제 입장
            dispatch(changeAiTalking(false));
            dispatch(importPrevQuiz(params.key, token));
        }
    }, []);

    useEffect(() => {
        if (createQuizDidMount) {
            axios.get(process.env.REACT_APP_API_URL + '/study/quiz/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                if (response.status === 200) {
                    dispatch(updateQuizId(response.data.quiz_id));
                    dispatch(updateWord(response.data.word));
                    dispatch(updateQuiz(JSON.parse(response.data.quiz).questions[0]));
                }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [createQuizDidMount])

    useEffect(() => {
        if (word !== '' && messages[messages.length - 1].text === '문제 생성을 시작합니다. 문제가 생성될 때까지 잠시 기다려 주세요.') {
            dispatch(updateMessages({
                text: `이번에 학습하실 단어는 "${word}" 입니다.`,
                isUser: false, id: Date.now(), step: step
            },
            {
                text: `입력창에 "${word}"를 입력하시면 단어 퀴즈가 시작됩니다.`,
                isUser: false, id: Date.now(), step: step
            },));
            dispatch(changeAiTalking(false));
        }
    }, [word, quiz]);

    return (
        <div className='flex'>
            <div className='w-0 lg:w-[320px] pt-[63px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page bg-[var(--color-primary-200)]'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList
                        token={token}
                        quizId={quizId}
                        scrollRef={scrollRef}
                    />
                </div>
                <div className="control">
                    {/* fixed 된 프롬프트 창 + 양 방향 화살표 버튼 */}
                    {/* 프롬프트 창 */}
                    <MessageForm
                        quizId={quizId}
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