

const RECEIVE_USER = 'users/RECEIVE_USER'
const RECEIVE_USERS = 'users/RECEVE_USERS'

const initialState = { shownUser: null }

const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        payload: users
    }
}

const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        payload: user
    }
}

export const viewUser = ({ username }) => async dispatch => {
    const response = await fetch(`/api/users/${username}`);
    debugger

    if(response.ok) {
        const data = await response.json();
        dispatch(receiveUser(data.user))
    }
}

const userReducer = (state = initialState, action) => {
    let newState = { ...(Object.freeze(state)) }

    switch (action.type) {
        case RECEIVE_USER:
            return { ...newState, shownUser: action.payload }
        case RECEIVE_USERS:
            return { ...newState, users: Object.values(action.payload) };
        default:
            return state;
    }

}

export default userReducer;