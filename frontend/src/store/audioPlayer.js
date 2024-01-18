export const PLAY_TRACK = 'audioPlayer/PLAY_TRACK';
export const PAUSE_TRACK = 'audioPlayer/PAUSE_TRACK';
export const PLAY_NEXT = 'audioPlayer/PLAY_NEXT';
export const PLAY_PREV = 'audioPlayer/PLAY_PREV';
export const REPLAY_TRACK = 'audioPlayer/REPLAY_TRACK';
export const SET_SHUFFLE_ON = 'audioPlayer/SHUFFLE_ON';
export const SET_SHUFFLE_OFF = 'audioPlayer/SHUFFLE_OFF';
export const SET_REPEAT_OFF = 'audioPlayer/REPEAT_OFF';
export const SET_REPEAT_ONCE = 'audioPlayer/REPEAT_ONCE';
export const SET_REPEAT_ALWAYS = 'audioPlayer/REPEAT_ALWAYS';
export const FETCH_TRACKS = 'audioPlayer/FETCH_TRACKS';
export const SET_VOLUME = 'audioPlayer/SET_VOLUME';
export const TRACK_NAV = 'audioPlayer/TRACK_NAV';

const initialState = { currentTrack: null, queue: [], isPlaying: false }

export const playTrack = () => {
    return {
        type: PLAY_TRACK
    }
}

export const pauseTrack = () => {
    return {
        type: PAUSE_TRACK
    }
}

export const playNext = () => {
    return {
        type: PLAY_NEXT
    }
}

export const fetchTracks = tracks => {
    return {
        type: FETCH_TRACKS,
        payload: tracks
    }
}

export const audioPlayerReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case PLAY_TRACK:
            return { ...state, isPlaying: true }
        case PAUSE_TRACK:
            return { ...state, isPlaying: false }
        case PLAY_NEXT:
            return { ...state, 
                currentTrack: state.currentTrack.queueIndex + 1, 
                isPlaying: true,
            }
        case FETCH_TRACKS:
            return { ...state,
                queue: action.payload.forEach((track, i = 0) => {
                    track.queueIndex = i;
                    i++
                })
            };
        default:
            return state;
    }
}