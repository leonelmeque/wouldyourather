export const SET_AUTH_USER = 'SET_AUTH_USER'

/**
 * Action Creator
 */
export function setAuthUser(id){
    return{
        type: SET_AUTH_USER,
        id
    }
}

/**
 * User Authentication
 */
export function authenticateUSer(user){
    return (dispatch)=>{
        dispatch(setAuthUser(user))
    }
}
    