import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";

import { IoIosAddCircleOutline } from "react-icons/io";

const tempHistory = [
    {
        "solved_day": "2023-12-19 10:21:56",
        "word": "있으매",
        "sentence": "네가 있으매 마음이 놓인다.",
    },
    {
        "solved_day": "2023-12-19 11:45:12",
        "word": "개방정",
        "sentence": "개방정 그만 떨어!",
    },
    {
        "solved_day": "2023-12-20 17:40:59",
        "word": "웬일",
        "sentence": "웬일로 선물까지 준비했어?",
    },
];

const NewChatAndHistory = () => {
    return (
        <div className="my-3">
            <div className="px-3">
                {/* new chat */}
                <button className="bg-[var(--color-primary-200)] hover:bg-[var(--color-primary-300)] w-full rounded-2xl mt-6 lg:my-0 px-6 py-3">
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
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hi</div>
                    <div>hell</div>
                </div>
            </div>
        </div>
    );
}

export default NewChatAndHistory;