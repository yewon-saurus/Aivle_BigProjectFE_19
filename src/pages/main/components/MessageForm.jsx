import React, { useEffect, useState } from 'react';
import { delay } from '../../../hooks/delay';

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

const sentences = {
    "sentences": [
        {
            "Sentence1": "학교는 학생들의 학습 환경을 개선하기 위해 교육 기술과 시설을 업그레이드해야 합니다.",
            "Sentence2": "건강을 개선하기 위해서는 규칙적인 운동과 올바른 식단이 필요합니다.",
            "Sentence3": "나는 피아노 실력을 개선하기 위해 매일 연습을 꾸준히 해야 합니다.",
        },
    ]
}

const MessageForm = ({ roundData, setMessages, messageFormRef, step, setStep }) => {
    const [message, setMessage] = useState('');
    const [quiz, setQuiz] = useState(question);
    const [studySentences, setStudySentences] = useState(sentences);
    const [aiIsTalking, setAiIsTalking] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        switch (step) {
            case 1:
                async function stepOne() {
                    // TODO: 여기서 /study/quiz에 request, setQuiz(response.data.questions[0]);
                    for (let i = 0; i < quiz.answers.length; i++) {
                        if (quiz.answers[i].correct === true) {
                            setCorrectAnswer(quiz.answers[i].answer);
                        }
                    }
                    setAiIsTalking(true);
                    addAiMessage(`다음은 "${roundData.word}"를 사용한 문장입니다.`);
                    await delay();
                    addAiMessage(`"${quiz.Sentence}"`);
                    await delay();
                    addAiMessage(`${quiz.question}\n다음 <보기> 중 가장 적절한 답안을 입력해 주세요. 정답 외 다른 입력은 모두 오답으로 처리됩니다.`);
                    await delay();
                    addAiMessage(`<보기>${quiz.answers.map((ele) => '\n- ' + ele.answer).join('')}`);
                    setAiIsTalking(false);
                }
                stepOne();
                break;
            case 4:
                studyReading();
                break;
            case 5:
                isItTurnToWriting();
                break;
            case 6:
                studyWriting();
                break;
            default:
        }
    }, [step]);
    
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
    
    const addAiMessage = (aiSay, isTyping=false) => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `${aiSay}`, isUser: false, isTyping: isTyping, id: Date.now() },
        ]);
    }
    
    const userInputJudge = async () => {
        if (step === 0 && message == roundData.word) setStep(1);
        else if (step === 1) correctJudge();
        else if (step === 2) {
            if (message === roundData.word) studyHandWriting();
            else endOfLearning();
        }
    }

    const correctJudge = async () => {
        switch (message) {
            case correctAnswer:
                // 사용자가 원한다면 -> 학습 사이클 진행
                setStep(2);
                setAiIsTalking(true);
                addAiMessage(`정답입니다!\n\n위 문장에서 단어 '${roundData.word}'는 '${correctAnswer}'(이)라는 의미로 사용되었습니다.`);
                await delay();
                addAiMessage(`👍`);
                await delay();
                addAiMessage(`정답을 맞힌 퀴즈에 한해서 쓰기/읽기 학습을 건너뛸 수 있습니다.\n\n이대로 학습을 마치시겠습니까?`);
                await delay();
                addAiMessage(`학습을 마치지 않고 학습을 진행하시겠다면, '${roundData.word}'(을)를 재입력해 주세요. 그 외 내용 입력 시 해당 단계에 대한 학습이 종료됩니다.`);
                setAiIsTalking(false);
                break;
            default:
                // 오답이었음과 정답이 뭐였는지 공개한 후, 학습 사이클 진행
                setAiIsTalking(true);
                addAiMessage(`오답입니다!\n\n위 문장에서 단어 '${roundData.word}'는 '${correctAnswer}'(이)라는 의미로 사용되었습니다.`);
                await delay();
                addAiMessage(`🥲`);
                await delay();
                addAiMessage(`퀴즈의 정답을 맞히지 못한 단어에 대해서는 쓰기/읽기 학습을 수행해야 합니다.`);
                await delay();
                setAiIsTalking(false);
                studyHandWriting();
            }
        }
        
    const studyHandWriting = async () => {
        setStep(3);
        setAiIsTalking(true);
        addAiMessage(`학습은 (1)쓰기, (2)읽기 순서로 이루어 집니다.`);
        await delay();
        addAiMessage(`'쓰기' 과정을 진행합니다. 다음 주어지는 문장들을 수기로 작성해 보시고, 사진을 업로드 해주세요.`);
        await delay();
        addAiMessage(`1. "${studySentences.sentences[0].Sentence1}"\n\n2. "${studySentences.sentences[0].Sentence2}"\n\n3. "${studySentences.sentences[0].Sentence3}"`);
        await delay();
        setAiIsTalking(false);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'handwriting' },
        ]);
    }
    
    const studyReading = async () => {
        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`);
        await delay();
        addAiMessage(`확인되었습니다. 훌륭하게 수행하셨군요!`);
        await delay();
        addAiMessage(`다음은 '읽기' 과정을 진행합니다. 다음 주어지는 문장들을 소리 내어 읽어보세요.`);
        await delay();
        addAiMessage(`1. "${studySentences.sentences[0].Sentence1}"\n\n2. "${studySentences.sentences[0].Sentence2}"\n\n3. "${studySentences.sentences[0].Sentence3}"`);
        await delay();
        setAiIsTalking(false);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'reading' },
        ]);
    }
    
    const isItTurnToWriting = async () => {
        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`);
        await delay();
        addAiMessage(`확인되었습니다. 훌륭하게 수행하셨군요!`);
        await delay();

        // 작문 해야되는 타이밍이니? 판단
        if (roundData.id % 5 === 0) {
            // 작문 해야 함
            setStep(6);
        }
        else {
            // 작문 안 해도 됨
            addAiMessage(`${roundData.id}단계 학습을 완료하셨습니다.`);
            await delay();
            endOfLearning();
        }

        setAiIsTalking(false);
    }

    const studyWriting = async () => {
        setAiIsTalking(true);
        addAiMessage(`작문해야돼요`);
        await delay();
        addAiMessage(`거의다왔다!`);
        await delay();
        setAiIsTalking(false);
    }
    
    const endOfLearning = async () => {
        // TODO: Main.jsx의 messages 배열 포함해, user study word 업데이트 하는 request 보내기
        addAiMessage(`학습을 종료합니다.`);
        setStep(-1);
    }
    
    return (
        <form className="message-form" onSubmit={handleSubmit}>
            {/* TODO: 텍스트 길이 초과로 줄 바뀔 때마다, textarea가 늘어나고 줄 바꿈 되면 좋겠는데.. */}
            <input
                ref={messageFormRef}
                type="textarea"
                className={`message-input ${aiIsTalking ? 'bg-[#9FB8F9]': ''}`}
                value={aiIsTalking ? '시스템의 응답을 수신 중입니다. 잠시 기다려 주세요.' : message}
                onChange={(e) => setMessage(e.target.value)}
                autoFocus
            />
            <button className="send-button" type="submit" disabled={message === ''}>
                <IoSend size={25} />
            </button>
        </form>
    );
};

export default MessageForm;