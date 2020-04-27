export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USER = "UPDATE_USER";

/**
 * Adding users to store
 */
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

/**
 * Updating user answered questions
 */

export function updateAnsweredQuestions({ authUser, qId, answer }) {
  return {
    type: UPDATE_USER,
    authUser,
    qId,
    answer,
  };
}

/**
 * Handle update answered questions
 */

export function handleUpdateAnsweredQuestions(info) {
  return (dispatch) => {
    dispatch(updateAnsweredQuestions(info));
  };
}
