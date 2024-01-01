import React, { useEffect, useState } from 'react';
import { delay, dateToTimestamp } from '../../../hooks/';

import { IoSend } from "react-icons/io5";
import axios from 'axios';

const sentences = {
    "sentences": [
        {
            "Sentence1": "학교는 학생들의 학습 환경을 개선하기 위해 교육 기술과 시설을 업그레이드해야 합니다.",
            "Sentence2": "건강을 개선하기 위해서는 규칙적인 운동과 올바른 식단이 필요합니다.",
            "Sentence3": "나는 피아노 실력을 개선하기 위해 매일 연습을 꾸준히 해야 합니다.",
        },
    ]
}

const MessageForm = ({ quizId, word, quiz, messages, setMessages, messageFormRef, step, setStep, aiIsTalking, setAiIsTalking, writingWords }) => {
    const token = sessionStorage.getItem('aivle19_token');
    const username = sessionStorage.getItem('aivle19_username');

    const [didMount, setDidMount] = useState(false);
    const [message, setMessage] = useState('');
    const [studySentences, setStudySentences] = useState(sentences);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        switch (step) {
            // Step 1: 퀴즈 풀기, Step 2: 퀴즈 정답자 안내 단계, Step 3: 쓰기, Step 4: 소리내어 읽기, 5: 읽기 끝, 6: 작문 할 건지 묻기, 7: 작문(단어 선택), 8: 작문(본격)
            case 1:
                async function stepOne() {
                    for (let i = 0; i < quiz.answers.length; i++) {
                        if (quiz.answers[i].correct === true) {
                            setCorrectAnswer(quiz.answers[i].answer);
                        }
                    }
                    setAiIsTalking(true);
                    addAiMessage(`다음은 "${word}"를 사용한 문장입니다.`);
                    await delay();
                    addAiMessage(`"${quiz.Sentence}"`);
                    await delay();
                    addAiMessage(`${quiz.question}\n\n다음 <보기> 중 가장 적절한 답안을 입력해 주세요. 정답 외 다른 입력은 모두 오답으로 처리됩니다.`);
                    await delay();
                    addAiMessage(`<보기>${quiz.answers.map((ele) => '\n- ' + ele.answer).join('')}`);
                    setAiIsTalking(false);
                }
                stepOne();
                break;
            case 2:
                quideToCorrect();
                break;
            case 3:
                studyHandWriting();
                break;
            case 4:
                studyReading();
                break;
            case 5:
                endOfReading();
                break;
            case 6:
                isItTurnToWriting();
                break;
            case 7:
                studyWriting();
                break;
            case 8:
                studyWriting2();
                break;
            case -1 :
                endOfLearning();
                break;
            default:
        }
    }, [step]);

    useEffect(() => {
        if (didMount) {
            const jsonString = JSON.stringify(messages);
            const today = dateToTimestamp(Date());
            const formData = new FormData();
            formData.append('chat_log', jsonString);
            formData.append('solved_date', today);
            axios.patch(process.env.REACT_APP_API_URL + '/study/quiz/' + quizId + '/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response.status === 200) console.log('solved date is updated.'); // console.log(JSON.parse(response.data.chat_log)); 테스트 해보니 잘 파싱 됨
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [didMount]);
    
    const handleSendMessage = (message) => {
        // message: 사용자가 form에 입력한 내용
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: message, isUser: true, id: Date.now(), step: step }, // 사용자의 메시지
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
            { text: `${aiSay}`, isUser: false, isTyping: isTyping, id: Date.now(), step: step},
        ]);
    }
    
    const userInputJudge = async () => {
        if (step === 0 && message === word) setStep(1);
        else if (step === 1) correctJudge();
        else if (step === 2) {
            if (message === word) {
                setStep(3);
            }
            else {
                setStep(6);
                setDidMount(true);
            }
        }
        else if (step === 8) {
            // TODO: 작문 상태 확인, 맞춤법 교정
        }
    }

    const correctJudge = async () => {
        switch (message) {
            case correctAnswer:
                // 사용자가 원한다면 -> 학습 사이클 진행
                setStep(2);
                break;
            default:
                // 오답이었음과 정답이 뭐였는지 공개한 후, 학습 사이클 진행
                setAiIsTalking(true);
                addAiMessage(`오답입니다!\n\n위 문장에서 단어 '${word}'는 '${correctAnswer}'(이)라는 의미로 사용되었습니다.`);
                await delay();
                addAiMessage(`🥲`);
                await delay();
                addAiMessage(`퀴즈의 정답을 맞히지 못한 단어에 대해서는 쓰기/읽기 학습을 수행해야 합니다.`);
                await delay();
                setAiIsTalking(false);
                setStep(3);
            };
        }
    
    const quideToCorrect = async () => {
        setAiIsTalking(true);
        addAiMessage(`정답입니다!\n\n위 문장에서 단어 '${word}'는 '${correctAnswer}'(이)라는 의미로 사용되었습니다.`);
        await delay();
        addAiMessage(`👍`);
        await delay();
        addAiMessage(`정답을 맞힌 퀴즈에 한해서 쓰기/읽기 학습을 건너뛸 수 있습니다.\n\n이대로 학습을 마치시겠습니까?`);
        await delay();
        addAiMessage(`학습을 마치지 않고 학습을 진행하시겠다면, '${word}'(을)를 재입력해 주세요. 그 외 내용 입력 시 현재 단계에 대한 학습이 종료됩니다.`);
        setAiIsTalking(false);
    }
        
    const studyHandWriting = async () => {
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
            { isUser: false, mode: 'handwriting', id: Date.now(), step: step },
        ]);
    }
    
    const studyReading = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `제출 완료`, isUser: true, id: Date.now(), step: step },
        ]);

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
            { isUser: false, mode: 'reading', id: Date.now(), step: step },
        ]);
    }
    
    const endOfReading = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `제출 완료`, isUser: true, id: Date.now(), step: step },
        ]);

        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`);
        await delay();
        addAiMessage(`확인되었습니다. 훌륭하게 수행하셨군요!`);
        await delay();
        addAiMessage(`👏`);
        await delay();
        setAiIsTalking(false);
        setStep(6);
        setDidMount(true);
    }

    const isItTurnToWriting = async () => {
        // 사용자가 작문을 할 수 있는 조건이 되는 지 확인하기
        const writingCheck = writingConditionCheck();
        console.log(writingCheck);
        if (writingCheck === undefined) {
            setStep(-1);
        }
        else {
            // 사용자한테 작문 할거냐고 물어보기
            addAiMessage(`잠시만요!`);
            await delay();
            addAiMessage(`${username} 님은 최근에 다섯 개 이상의 단어를 학습했고, 이제 '작문하기' 단계에 도전할 준비가 된 상태입니다.`);
            await delay();
            addAiMessage(`이어서 '작문하기'를 수행하시겠습니까?`);
            await delay();
            
            setMessages((prevMessages) => [
                ...prevMessages,
                { isUser: false, mode: 'areYouWantToWriting', id: Date.now(), step: step },
            ]);
        }
    }

    const studyWriting = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `네, 작문하기를 시작합니다.`, isUser: true, id: Date.now(), step: step },
        ]);

        setAiIsTalking(true);
        addAiMessage(`'작문하기' 과정을 진행합니다.`);
        await delay();
        addAiMessage(`다음 주어지는 단어 목록은 '최근에 학습한 다섯 개의 단어' 목록입니다.\n\n다음 단어 중, '두 개 이상'의 단어를 선택하세요. 선택 완료 후, 선택한 단어를 이용해 '작문하기'를 수행하게 됩니다.`);
        await delay();
        setAiIsTalking(false);
        
        setMessages((prevMessages) => [
            ...prevMessages,
            { isUser: false, mode: 'writing', id: Date.now(), step: step },
        ]);
    }
    
    const studyWriting2 = async () => {
        setMessages((prevMessages) => [
            ...prevMessages, // 이전 메시지들
            { text: `선택 완료`, isUser: true, id: Date.now(), step: step },
        ]);

        setAiIsTalking(true);
        addAiMessage(`확인 중입니다.`);
        await delay();
        addAiMessage(`선택하신 단어는 다음과 같습니다.`);
        await delay();
        addAiMessage(`${writingWords.map((ele, idx) => (idx + 1) +'. ' + ele.word + '\n').join('')}`);
        await delay();
        addAiMessage(`이제, 위 단어를 이용해 자유롭게 문장을 작문해 주세요.\n\n하단의 입력창을 통해 문장을 제출하시면, 맞춤법 확인 및 교정이 이루어진 뒤 완전히 학습을 마치게 됩니다.`);
        await delay();
        setAiIsTalking(false);
    }
    
    const endOfLearning = () => {
        addAiMessage(`${Date()}, 학습을 완료하셨습니다.`);
        delay();
        addAiMessage(`학습을 종료합니다.`);
    }

    const writingConditionCheck = async () => {
        axios.get(process.env.REACT_APP_API_URL + '/study/writing/', {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) return response.data.quiz_words;
        })
        .catch(error => {
            console.error(error);
        });
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