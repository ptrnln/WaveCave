import csrfFetch from "./csrf"

const RECEIVE_TRACK = 'tracks/RECEIVE_TRACK'
const RECEIVE_TRACKS = 'tracks/RECEIVE_TRACKS'
const REMOVE_TRACK = 'tracks/REMOVE_TRACK'
const REMOVE_TRACKS = 'tracks/REMOVE_TRACKS'
const RECEIVE_LOCAL_SOURCE = 'tracks/RECEIVE_LOCAL_SOURCE'

export async function deleteTrack (trackId) {
    const response = await csrfFetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
    })
    
    if(response.ok) {
        const data = await response.json();
        return data
    }
}

const initialState = {}

export const receiveTrack = track => {
    return {
        type: RECEIVE_TRACK,
        track
    }
}

export const receiveTracks = tracks => {
    return {
        type: RECEIVE_TRACKS,
        tracks
    }
}

export const removeTrack = trackId => {
    return {
        type: REMOVE_TRACK,
        trackId
    }
}

export const removeTracks = trackIds => {
    return {
        type: REMOVE_TRACKS,
        trackIds
    }
}

export const receiveLocalSource = trackId => async (dispatch, getState) => {
    const response = await fetch(getState().tracks[trackId].sourceUrl);

    const data = await response.blob();
    const localSource = URL.createObjectURL(data);
    dispatch({
        type: RECEIVE_LOCAL_SOURCE,
        trackId,
        localSource
    })
}

export const loadTracksLocally = trackIds => async (dispatch) => {
    // const tracks = getState().tracks
    for(const trackId of trackIds) {
        dispatch(receiveLocalSource(trackId))
    }
}

export const loadTrack = trackId => async (dispatch, getState) => {
    const track = getState().tracks[trackId];
    if(track === undefined) {
        const response = await fetch(`/api/tracks/${trackId}`);
    
        if(response.ok) {
            let data = await response.json();
            dispatch(receiveTrack(data.track));
            return data.track;
        } else {
            return response.error
        }
    } else {
        return track;
    }
}

export const loadTracks = trackIds => async dispatch => {
    let tracks = {}
    for(const trackId of trackIds) {
        const track = await dispatch(loadTrack(trackId));
        tracks[track.id] = track
    }
    return tracks
}

export async function createTrack (trackData, audioFile, imageFile) {
    const { title, description, genre, duration, fileType } = trackData;
    
    const formData = new FormData();
    formData.append('track[title]', title);
    formData.append('track[description]', description);
    formData.append('track[genre]', genre);
    formData.append('track[duration]', duration);
    formData.append('track[file_type]', fileType);
    if (audioFile) formData.append('track[source]', audioFile);
    if (imageFile) formData.append('track[photo]', imageFile)
    const response = await csrfFetch(`api/tracks`, {
        method: 'POST',
        body: formData
    })
    
    let data = await response.json();
    
    return data
}

export async function updateTrack (trackData, audioFile, imageFile) {
    const { id, title, description, genre, duration, fileType } = trackData;

    let mimeType;
    switch (fileType) {
        case 'mp3':
            mimeType = 'mpeg'
            break;
        case 'wav':
            mimeType = 'wav'
            break;
        case 'flac':
            mimeType = 'flac'
            break;
    }
    
    const formData = new FormData();
    if(title) formData.append('track[title]', title);
    if(description) formData.append('track[description]', description);
    if(genre) formData.append('track[genre]', genre);
    if(duration) formData.append('track[duration]', duration);
    if(fileType) formData.append('track[fileType]', mimeType);
    if(audioFile) formData.append('track[source]', audioFile);
    if(imageFile) formData.append('track[photo]', imageFile)

    const response = await csrfFetch(`/api/tracks/${id}`, {
        method: 'PUT',
        body: formData
    })
    
    return response
}

const trackReducer = (state = initialState, action) => {
    Object.freeze(state)

    let newState = { ...state }

    switch(action.type) {
        case RECEIVE_TRACK:
            return { ...state, ...action.track }
        case RECEIVE_TRACKS:
            return { ...state, ...action.tracks }
        case REMOVE_TRACK:
            delete newState[action.trackId]
            return newState
        case REMOVE_TRACKS:
            for(const trackId of action.trackIds) {
                delete newState[trackId]
            }
            return newState
        case RECEIVE_LOCAL_SOURCE:
            newState[action.trackId].localSource = action.localSource
            return newState;
        default:
            return state;
    }
}

export default trackReducer;