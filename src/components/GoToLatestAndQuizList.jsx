import React, {useState} from "react";
import QuizItem from "./QuizItem";

import { MdHistory } from "react-icons/md";


const GoToLatestAndQuizList = () => {
    const list = [
        {
            "id": 1,
            "word": "가설",
            "meanig": "어떤 사실을 설명하",
            "solved_date": "2023-12-19 10:21:56",
            "username": "yewon",
        },
        {
            "id": 2,
            "word": "각인되다",
            "meanig": "머릿속에 새겨 넣듯어쩌구",
            "solved_date": "2023-12-12 10:21:57",
            "username": "yewon",
        },
        {
            "id": 3,
            "word": "감안하다",
            "meanig": "고찰하다",
            "solved_date": null,
            "username": "yewon",
        },
    ]; // SELECT round, solved_date, words, sentence FROM 퀴즈 where username={로그인중인사용자};
    
    const [latest, setLatest] = useState(list[1]); // 개발 중 임시 데이터
    const [quizlist, setQuizlist] = useState(list); // 개발 중 임시 데이터로 초기화

    return (
        <div>
            <div className="mt-6 px-3">
                {/* new chat */}
                <div className="text-left text-[var(--color-info-900)]">
                    이어서 학습하기
                </div>
                <a className="flex gap-2 text-left bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)] w-full rounded-full lg:my-0 px-6 py-3 text-[var(--color-info-500)]"
                    href={process.env.PUBLIC_URL + "/"}>
                    <MdHistory size={25} />
                    <span className="truncate">{latest.id + "회차: " + latest.word}</span>
                </a>
            </div>
            <div className="mt-6">
                {/* history list */}
                <div className="px-3 text-left text-[var(--color-info-900)]">
                    학습 목록
                </div>
                <div className="history">
                    {
                        quizlist.map((ele) =>
                            <QuizItem data={ele} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default GoToLatestAndQuizList;