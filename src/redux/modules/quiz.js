const initialState = {
    aiIsTalking: true,
    step: 0,
    word: '',
    quiz: {},
    correctAnswer: '',
    studySentence: '',
    messages: [
        {
            text: `어서오세요.\n생성형 AI를 통한 문해력 향상 학습 서비스에 입장하셨습니다.`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `학습은 다음과 같은 단계를 거쳐 진행됩니다.\n\n1. 랜덤 단어 퀴즈 풀기\n2. 단어 연습(퀴즈 오답 시 필수, 정답 시 선택 사항)\n3. 학습한 단어를 활용해 작문 해보기`,
            isUser: false, isTyping: false, id: Date.now()
        },
        {
            text: `문제 생성을 시작합니다. 문제가 생성될 때까지 잠시 기다려 주세요.`,
            isUser: false, isTyping: false, id: Date.now()
        },
    ],
    writingWords: [],
}

const CHANGE_AI_TALKING = "QUIZ/CHANGE_AI_TALKING";
const UPDATE_STEP = "QUIZ/UPDATE_STEP";
const UPDATE_WORD = "QUIZ/UPDATE_WORD";
const UPDATE_QUIZ = "QUIZ/UPDATE_QUIZ";
const UPDATE_CORRECT_ANSWER = "QUIZ/UPDATE_CORRECT_ANSWER";
const UPDATE_STUDY_SENTENCE = "QUIZ/UPDATE_STUDY_SENTENCE";
const UPDATE_MESSAGES = "QUIZ/UPDATE_MESSAGES";
const UPDATE_WRITING_WORDS = "QUIZ/UPDATE_WRITING_WORDS";
const ADD_WRITING_WORD = "QUIZ/ADD_WRITING_WORD";

export const changeAiTalking = (newAiIsTalking) => {
    return {
        type: CHANGE_AI_TALKING,
        newAiIsTalking: newAiIsTalking,
    }
}

export const updateStep = (newStep) => {
    return {
        type: UPDATE_STEP,
        newStep: newStep,
    }
}

export const updateWord = (newWord) => {
    return {
        type: UPDATE_WORD,
        newWord: newWord,
    }
}

export const updateQuiz = (newQuiz) => {
    return {
        type: UPDATE_QUIZ,
        newQuiz: newQuiz,
    }
}

export const updateCorrectAnswer = (newCorrectAnswer) => {
    return {
        type: UPDATE_CORRECT_ANSWER,
        newCorrectAnswer: newCorrectAnswer,
    }
}

export const updateStudySentence = (newStudySentence) => {
    return {
        type: UPDATE_STUDY_SENTENCE,
        newStudySentence: newStudySentence,
    }
}

export const updateMessages = (newMassage) => {
    return {
        type: UPDATE_MESSAGES,
        newMassage: newMassage,
    }
}

export const updateWritingWords = (newWritingWords) => {
    return {
        type: UPDATE_WRITING_WORDS,
        newWritingWords: newWritingWords,
    }
}

export const addWritingWord = (newWritingWord) => {
    return {
        type: ADD_WRITING_WORD,
        newWritingWord: newWritingWord
    }
}

export default function (state=initialState, action) {
    switch (action.type) {
        case CHANGE_AI_TALKING: {
            return {
                ...state,
                aiIsTalking: action.newAiIsTalking,
            }
        }
        case UPDATE_STEP: {
            return {
                ...state,
                step: action.newStep,
            }
        }
        case UPDATE_WORD: {
            return {
                ...state,
                word: action.newWord,
            }
        }
        case UPDATE_QUIZ: {
            return {
                ...state,
                quiz: action.newQuiz,
            }
        }
        case UPDATE_CORRECT_ANSWER: {
            return {
                ...state,
                correctAnswer: action.newCorrectAnswer,
            }
        }
        case UPDATE_STUDY_SENTENCE: {
            return {
                ...state,
                studySentence: action.newStudySentence,
            }
        }
        case UPDATE_MESSAGES: {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.newMassage,
                ],
            }
        }
        case UPDATE_WRITING_WORDS: {
            return {
                ...state,
                writingWords: action.newWritingWords,
            }
        }
        case ADD_WRITING_WORD: {
            return {
                ...state,
                writingWords: [
                    ...state.writingWords,
                    action.newWord,
                ],
            }
        }
        
        default:
            return state;
    }
}