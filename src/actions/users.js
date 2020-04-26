export const RECEIVE_USERS = "RECEIVE_USERS";

//Adding questions to the store
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
