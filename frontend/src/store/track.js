import csrfFetch from "./csrf"

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
        let data = await response.json();
        dispatch(receiveTrack(data.tracks));
        return response;
    }
}

export async function createTrack (trackData, audioFile, imageFile) {
    const { title, description, genre, duration, file_type } = trackData;
    
    const formData = new FormData();
    formData.append('track[title]', title);
    formData.append('track[description]', description);
    formData.append('track[genre]', genre);
    formData.append('track[duration]', duration);
    formData.append('track[file_type]', file_type);
    formData.append('track[source]', audioFile);
    if (imageFile) formData.append('track[photo]', imageFile)
    const response = await csrfFetch(`api/tracks`, {
        method: 'POST',
        body: formData
    })
    debugger
    let data = await response.json();
    
    return data
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