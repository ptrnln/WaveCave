
const RECEIVE_TRACK = 'tracks/RECEIVE_TRACK'
const RECEIVE_TRACKS = 'tracks/RECEIVE_TRACKS'

const initialState = { tracks: null }

const receiveTrack = track => {
    return {
        type: RECEIVE_TRACK,
        payload: track
    }
}

const receiveTracks = tracks => {
    return {
        type: RECEIVE_TRACKS,
        payload: tracks
    }
}

export const loadTrack = trackId => async dispatch => {
    const response = await fetch(`api/tracks/${trackId}`);

    if(response.ok) {
        let data = await response.json()
        dispatch(receiveTrack(data.tracks));
        return response;
    }
}

const trackReducer = (state = initialState, action) => {
    Object.freeze(state)

    switch(action.type) {
        case RECEIVE_TRACK:
            return { ...state, track: action.payload }
        case RECEIVE_TRACKS:
            return { ...state, tracks: action.payload }
        default:
            return state;
    }
}

export default trackReducer;