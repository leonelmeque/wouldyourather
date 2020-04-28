import { saveQuestionAnswer, saveNewQuestion } from "../utils/api";

/** Actions Types*/
export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWERED_QUESTIONS = "ANSWERED_QUESTIONS";
export const UNANSWERED_QUESTIONS = "UNANSWERED_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

/** Action Creators */

//Adding new question to the store
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function answerQuestion({ authUser, id, answer }) {
  return {
    type: ANSWER_QUESTION,
    authUser,
    id,
    answer,
  };
}

//Adding questions to the store
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

/** Asynchronous action creators */
export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn("Question was not answered ", e);
      alert("Failed to answer you question :-(");
    });
  };
}

export function handleSaveNewQuestion(info) {
  console.log(info);
  return (dispatch) => {
    dispatch(addQuestion(info));

    return saveNewQuestion(info).catch((e) => {
      console.warn("Question was not saved ", e);
      alert("Failed to save the new question :-(");
    });
  };
}
