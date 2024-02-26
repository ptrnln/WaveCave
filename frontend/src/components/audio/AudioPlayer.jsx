
import './AudioPlayer.css'
import { tracks } from '../../data/tracks'
import { useEffect, useRef, useState } from "react";
import TrackDisplay from "./TrackDisplay";
import AudioControls from './AudioControls';
import AudioItem from './AudioItem';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as audioPlayerActions from '../../store/audioPlayer';
import ProgressBar from './ProgressBar';

export default function AudioPlayer() {
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.audio.currentIndex)
    const tracks = useSelector(state => state.tracks);
    const isRepeating = useSelector(state => state.audio.isRepeating);
    const hasRepeated = useSelector(state => state.audio.hasRepeated);
    const isPlaying = useSelector(state => state.audio.isPlaying);
    const audioRef = useRef();
    const progressBarRef = useRef();

    // useEffect(() => {
    //     setCurrentTrack(tracks[trackIndex]);
    //     setDuration(currentTrack.duration);
    //     setTimeProgress(0);
    // }, [trackIndex, currentTrack.duration])

    
    
    const handleNext = (e) => {
        e.preventDefault();
        dispatch(audioPlayerActions.playNext());
        if(!isPlaying) dispatch(audioPlayerActions.playTrack());
    }
    
    const handlePrev = (e) => {
        e.preventDefault();
        if(audioRef.current.currentTime <= 3 && !currentIndex == 0) {
            dispatch(audioPlayerActions.playPrev())
        } else {
            audioRef.current.currentTime = 0;
        }
    }
    
    useEffect(() => {
        if(tracks.length === 1 && (isRepeating === 'always' || isRepeating === 'once' && !hasRepeated)) {
            audioRef.current.currentTime = 0
        }
    }, [isRepeating, handleNext]);

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