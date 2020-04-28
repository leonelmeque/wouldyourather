import { getInitialData } from "../utils/api";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { setAuthUser } from "../actions/authUser";



export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions,authUser }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthUser(authUser));
    });
  };
}
