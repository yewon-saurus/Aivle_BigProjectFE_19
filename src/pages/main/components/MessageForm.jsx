import React, { useState } from 'react';

import { IoSend } from "react-icons/io5";

const question = {
    "Sentence": "논거가 어떤 이론이나 논리, 논설 따위의 근거을 의미를 가지도록 문장을 생성한다.",
    "question": "위 문장에서 '논거'가 의미하는 바는 무엇인가요?",
    "answers": [
        {
            "answer": "이론",
            "correct": false
        },
        {
            "answer": "근거",
            "correct": false
        },
        {
            "answer": "논리",
            "correct": false
        },
        {
            "answer": "논설",
            "correct": true
        }
    ]
};

const MessageForm = ({ roundData, currentTypingId, setMessages, messageFormRef }) => {
    const [message, setMessage] = useState('');
    const [quiz, setQuiz] = useState(question);
    
    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true }, // 사용자의 메시지
            // { text: `Your message is: "${message}"`, isUser: false, isTyping: true, id: Date.now() },
        ]);
        userInputJudge();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSendMessage(message);
        setMessage('');
    };
    
    const addAiMessage = (aiSay) => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `${aiSay}`, isUser: false, isTyping: true, id: Date.now() },
        ]);
    }
    
        const userInputJudge = () => {
            switch (message) {
                case roundData.word:
                    // TODO: 여기서 /study/quiz에 request, setQuiz(response.data.questions[0]);
                    // console.log(quiz.answers.map((ele) => ele.answer));
                    addAiMessage(
                        `다음은 "${roundData.word}"를 사용한 문장입니다.\n\n"${quiz.Sentence}"\n\n${quiz.question}
                        다음 <보기> 중 가장 적절한 답안을 입력해 주세요.\n
                        <보기>${quiz.answers.map((ele, idx) => '\n- ' + ele.answer).join('')}`
                    );
                    break;
                default: console.log("user input judge module .. default");
            }
        }
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            {/* TODO: 텍스트 길이 초과로 줄 바뀔 때마다, textarea가 늘어나고 줄 바꿈 되면 좋겠는데.. */}
            <input
                ref={messageFormRef}
                type="textarea"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" type="submit" disabled={currentTypingId || message === ''}>
                <IoSend size={25} />
            </button>
        </form>
    );
};

export default MessageForm;