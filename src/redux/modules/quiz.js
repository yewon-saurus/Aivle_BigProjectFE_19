const initialState = {
    aiIsTalking: true,
    step: 0,
    word: '',
}

const CHANGE_AI_TALKING = "QUIZ/CHANGE_AI_TALKING";
const UPDATE_STEP = "QUIZ/UPDATE_STEP";
const UPDATE_WORD = "QUIZ/UPDATE_WORD";

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
        case UPDATE_WORD:
            return {
                ...state,
                word: action.newWord,
            }
        default:
            return state;
    }
}