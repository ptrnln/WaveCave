
import './AudioPlayerContainer.css'
import { tracks } from '../../data/tracks'
import { useEffect, useRef, useState } from "react";
import TrackDisplay from "./TrackDisplay";
import AudioControls from './AudioControls';
import AudioPlayer from './AudioPlayer';
import { useDispatch, useSelector } from 'react-redux';
import * as audioPlayerActions from '../../store/audioPlayer';
import ProgressBar from './ProgressBar';

export default function AudioPlayerContainer() {
    const dispatch = useDispatch();
    // const isPlaying = useSelector(state => state.audio.isPlaying)
    // const originalQueue = useSelector(state => state.audio.queue.original);
    // const shuffledQueue = useSelector(state => state.audio.queue.shuffled);

    // const [trackIndex, setTrackIndex] = useState(0);
    // const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    
    // const [timeProgress, setTimeProgress] = useState(0);
    // const [duration, setDuration] = useState(0);

    const currentTrack = useSelector(state => {
        if(state.audio.isShuffled) {
            return state.tracks[state.audio.queue.shuffled[state.audio.currentIndex]]
        }
        return state.tracks[state.audio.queue.original[state.audio.currentIndex]]
    })

    const audioRef = useRef();
    const progressBarRef = useRef();

    // useEffect(() => {
    //     setCurrentTrack(tracks[trackIndex]);
    //     setDuration(currentTrack.duration);
    //     setTimeProgress(0);
    // }, [trackIndex, currentTrack.duration])

    const handleNext = () => {
        dispatch(audioPlayerActions.playNext())
        dispatch(audioPlayerActions.playTrack())
    }

    const handlePrev = () => {

    }

    return (
        <div className="audio-player">
            <div className="inner">
                <AudioControls {...{
                    handleNext,
                }}/>
                <ProgressBar {...{
                    audioRef,
                    progressBarRef,
                }}/>
                 <AudioPlayer {...{
                    audioRef,
                    progressBarRef,
                    handleNext
                }}/>
                <TrackDisplay />
            </div>
        </div>
    )
}