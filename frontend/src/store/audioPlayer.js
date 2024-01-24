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
                currentTrackId: state.currentTrackId || 
                    state.isShuffled
                        ? state.queue.shuffled[0]
                        : state.queue.original[0]
            }
        case PAUSE_TRACK:
            return { ...state, isPlaying: false }
        case PLAY_NEXT:
            var newIndex = state.queue.original.length - 1 === state.currentIndex ? 0 :
                state.currentIndex + 1
            return { ...state, 
                currentIndex: newIndex,
                currentTrackId: state.isShuffled 
                    ? state.queue.shuffled[newIndex]
                    : state.queue.original[newIndex],
                isPlaying: true,
            };
        case PLAY_PREV:
            var newIndex = state.currentIndex - 1
            return { ...state,
                currentIndex: newIndex,
                currentTrackId: state.isShuffled
                    ? state.queue.shuffled[newIndex]
                    : state.queue.original[newIndex],
                isPlaying: true
            };
        case LOAD_TRACKS:
            let shuffledQueue = shuffle([...action.trackIds])
            return { ...state,
                queue: {
                    original: action.trackIds,
                    shuffled: shuffledQueue
                },
                currentTrackId: state.isShuffled
                    ? action.trackIds[0]
                    : shuffledQueue[0]
            };
        case SET_SHUFFLE_ON:
            let trackId = state.currentTrackId || 0
            shuffledQueue = shuffle(state.queue.original)
            var newIndex = shuffledQueue.indexOf(trackId)
            return { ...state,
                isShuffled: true,
                queue: {
                    shuffled: shuffledQueue
                },
                currentIndex: newIndex
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