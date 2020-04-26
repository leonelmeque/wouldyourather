/** Actions Types*/
export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWERED_QUESTIONS = 'ANSWERED_QUESTIONS';
export const UNANSWERED_QUESTIONS = 'UNANSWERED_QUESTIONS';


/** Action Creators */

//Adding new question to the store
export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

//Adding questions to the store
export function receiveQuestions (questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}


