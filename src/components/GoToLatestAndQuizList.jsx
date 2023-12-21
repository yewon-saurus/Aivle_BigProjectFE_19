import React, {useState} from "react";
import QuizItem from "./QuizItem";

import { MdHistory } from "react-icons/md";


const GoToLatestAndQuizList = () => {
    const list = [
        {
            "round": 1,
            "solved_date": "2023-12-19 10:21:56",
            "words": ["있으매", "마음", "놓다", "인생", "하늘"],
            "sentence": "네가 있으매 마음이 놓인다.",
        },
        {
            "round": 2,
            "solved_date": "2023-12-19 11:45:12",
            "words": ["개방정", "그만", "떨다", "펼치다", "당신"],
            "sentence": "개방정 그만 떨어! 깨방정이 아니라 개방정이었다는 사실 아셨나요?",
        },
        {
            "round": 3,
            "solved_date": null,
            "words": ["웬일", "분석", "선물", "시작", "문제"],
            "sentence": null,
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
                <button className="bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)] w-full rounded-full lg:my-0 px-6 py-3">
                    <div className="flex gap-2 text-left text-[var(--color-info-500)]">
                        <MdHistory size={25} />
                        <span className="truncate">{latest.round + "회차: " + latest.sentence}</span>
                    </div>
                </button>
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