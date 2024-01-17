import csrfFetch, { storeCSRFToken } from "./csrf";

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const initialState = { user: null };

const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const restoreSession = () => async dispatch => {
    const response = await fetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signUp = user => async dispatch => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if(response.ok) {
        dispatch(login({ credential: username || email, password }));
        return response;
    }
};

export const login = ({ credential, password }) => async dispatch => {
    const response = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });
    
    const data = await response.json();
    dispatch(setUser(data.user));
    // storeUserData(data.user)
    return response;
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if(response.ok) {
        dispatch(removeUser())
    }
    return response;
}

export const storeUserData = user => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state)

    switch(action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state;
    }
}

export default sessionReducer;