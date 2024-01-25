import { tracks } from "../data/tracks";

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
export const LOAD_TRACKS = 'audioPlayer/LOAD_TRACKS';
export const LOAD_TRACK = 'audioPlayer/LOAD_TRACK'
export const SET_VOLUME = 'audioPlayer/SET_VOLUME';

const initialState = { 
    queue: {
        original: [],
        shuffled: []
    },
    currentIndex: 0,
    currentTrackId: null,
    isPlaying: false,
    isShuffled: false,
    isRepeating: 'false',
    volume: 60,
}

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

export const loadTrack = trackId => {
    return {
        type: LOAD_TRACK,
        trackId
    }
}

export const loadTracks = trackIds => {
    return {
        type: LOAD_TRACKS,
        trackIds
    }
}

const shuffle = array => {
    if(array.length <= 1) return array
    let idx = array.length - 1, randIdx;

    while (idx >= 0) {
        randIdx = Math.floor(Math.random() * idx + 1);
        [array[idx], array[randIdx]] = [array[randIdx], array[idx]]
        
        idx--;
    }
    
    return array
}

export const audioPlayerReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case PLAY_TRACK:
            return { ...state, 
                isPlaying: true,
            }
        case PAUSE_TRACK:
            return { ...state, isPlaying: false }
        case PLAY_NEXT:
            var newIndex = (state.queue.original.length - 1 === state.currentIndex) ? 0 : state.currentIndex + 1
            return { ...state, 
                currentIndex: newIndex,
                isPlaying: true,
            };
        case PLAY_PREV:
            var newIndex = state.currentIndex - 1
            return { ...state,
                currentIndex: newIndex,
                isPlaying: true
            };
        case LOAD_TRACK:
            return {...state,
                currentIndex: 0,
                // isPlaying: true,
                queue: {
                    original: [action.trackId],
                    shuffled: [action.trackId]
                }
            }
        case LOAD_TRACKS:
            let shuffledQueue = shuffle([...action.trackIds])
            return { ...state,
                queue: {
                    original: action.trackIds,
                    shuffled: shuffledQueue
                },
            };
        case SET_SHUFFLE_ON:
            shuffledQueue = shuffle(state.queue.original)
            
            return { ...state,
                isShuffled: true,
                queue: {
                    shuffled: shuffledQueue
                }
            }
        case SET_SHUFFLE_OFF:
            var newIndex = state.queue.original.indexOf(state.queue.shuffled[state.currentIndex])
            return { ...state, 
                isShuffled: false,
                currentIndex: newIndex
            }
        default:
            return state;
    }
}