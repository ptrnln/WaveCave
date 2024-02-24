
import './AudioPlayer.css'
import { tracks } from '../../data/tracks'
import { useEffect, useRef, useState } from "react";
import TrackDisplay from "./TrackDisplay";
import AudioControls from './AudioControls';
import AudioItem from './AudioItem';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as audioPlayerActions from '../../store/audioPlayer';
import ProgressBar from './ProgressBar';

export default function AudioPlayerContainer() {
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.audio.currentIndex, shallowEqual)

    // const [trackIndex, setTrackIndex] = useState(0);
    // const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    
    // const [timeProgress, setTimeProgress] = useState(0);
    // const [duration, setDuration] = useState(0);

    const audioRef = useRef();
    const progressBarRef = useRef();

    // useEffect(() => {
    //     setCurrentTrack(tracks[trackIndex]);
    //     setDuration(currentTrack.duration);
    //     setTimeProgress(0);
    // }, [trackIndex, currentTrack.duration])

    const handleNext = (e) => {
        e.preventDefault();
        dispatch(audioPlayerActions.playNext())
        dispatch(audioPlayerActions.playTrack())
    }

    const handlePrev = (e) => {
        e.preventDefault();
        if(audioRef.current.currentTime <= 3 && !currentIndex == 0) {
            dispatch(audioPlayerActions.playPrev())
        } else {
            audioRef.current.currentTime = 0;
        }
    }

    return (
        <div className="audio-player">
            <div className="inner">
                <AudioControls {...{
                    handleNext,
                    handlePrev,
                }}/>
                <ProgressBar {...{
                    audioRef,
                    progressBarRef,
                }}/>
                 <AudioItem {...{
                    audioRef,
                    progressBarRef,
                    handleNext
                }}/>
                <TrackDisplay />
            </div>
        </div>
    )
}