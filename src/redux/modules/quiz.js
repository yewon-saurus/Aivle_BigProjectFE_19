const initialState = {
    aiIsTalking: true,
    step: 0,
    word: '',
    quiz: {},
    correctAnswer: '',
}

const CHANGE_AI_TALKING = "QUIZ/CHANGE_AI_TALKING";
const UPDATE_STEP = "QUIZ/UPDATE_STEP";
const UPDATE_WORD = "QUIZ/UPDATE_WORD";
const UPDATE_QUIZ = "QUIZ/UPDATE_QUIZ";
const UPDATE_CORRECT_ANSWER = "QUIZ/UPDATE_CORRECT_ANSWER";

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
            
        default:
            return state;
    }
}