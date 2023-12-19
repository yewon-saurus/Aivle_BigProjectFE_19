import React, {useState} from "react";
import HistoryItem from "./HistoryItem";

import { IoIosAddCircleOutline } from "react-icons/io";

const tempHistory = [
    {
        "history_id": 1,
        "solved_day": "2023-12-19 10:21:56",
        "word": "있으매",
        "sentence": "네가 있으매 마음이 놓인다.",
    },
    {
        "history_id": 2,
        "solved_day": "2023-12-19 11:45:12",
        "word": "개방정",
        "sentence": "개방정 그만 떨어!",
    },
    {
        "history_id": 3,
        "solved_day": "2023-12-20 17:40:59",
        "word": "웬일",
        "sentence": "웬일로 선물까지 준비했어? 준비 안했어? 했어?",
    },
];

const NewChatAndHistory = () => {
    const [history, setHistory] = useState(tempHistory); // 개발 중 임시 데이터로 초기화

    return (
        <div className="my-3">
            <div className="px-3">
                {/* new chat */}
                <button className="bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)] w-full rounded-full mt-6 lg:my-0 px-6 py-3">
                    <div className="flex text-left text-[var(--color-info-500)]">
                        <IoIosAddCircleOutline size={25} />
                        <span>&nbsp;&nbsp;새 채팅</span>
                    </div>
                </button>
            </div>
            <div className="mt-6">
                {/* history list */}
                <div className="px-3 text-left text-[var(--color-info-900)]">
                    최근
                </div>
                <div className="history">
                    {
                        history.map((ele) =>
                            <HistoryItem data={ele} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default NewChatAndHistory;