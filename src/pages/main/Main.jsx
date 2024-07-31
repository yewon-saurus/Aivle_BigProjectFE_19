import style from "./style.css";
import React, {useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { MessageForm, MessageList } from './components';
import GoToLatestAndQuizList from '../../components/GoToLatestAndQuizList';

import { useDispatch } from "react-redux";
import {
    changeAiTalking,
    createNewQuiz,
    importPrevQuiz,
} from "../../redux/modules/quiz";

const Main = () => {
    const params = useParams();

    const dispatch = useDispatch();

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
            dispatch(importPrevQuiz(params.key));
        }
    }, []);

    useEffect(() => {
        if (createQuizDidMount) dispatch(createNewQuiz());
    }, [createQuizDidMount])

    return (
        <div className='flex'>
            <div className='w-0 lg:w-[320px] pt-[63px]'>
                <GoToLatestAndQuizList />
            </div>
            <div className='page bg-[var(--color-primary-200)]'>
                <div>
                    {/* 대화 형식으로 나타난 학습 로그 */}
                    <MessageList scrollRef={scrollRef} />
                </div>
                <div className="control">
                    {/* fixed 된 프롬프트 창 + 양 방향 화살표 버튼 */}
                    {/* 프롬프트 창 */}
                    <MessageForm messageFormRef={messageFormRef} />
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