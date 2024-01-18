
import { tracks } from '../../data/tracks'
import { useEffect, useRef, useState } from "react";
import TrackDisplay from "./TrackDisplay";
import AudioControls from './AudioControls';

export default function AudioPlayer() {

    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        setCurrentTrack(tracks[trackIndex]);
        setDuration(currentTrack.duration);
        setTimeProgress(0);
    }, [trackIndex])

    const handleNext = () => {
        if(trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
        } else {
            setTrackIndex(trackIndex + 1);
        }
    }
    console.log('audio player loaded');

    return (
        <div className="audio-player">
            <div className="inner">
                <TrackDisplay {...{
                    trackIndex,
                    timeProgress,
                    duration,
                    currentTrack,
                    handleNext,
                    audioRef,
                    progressBarRef
                }}/>
                <AudioControls {...{
                    trackIndex,
                    timeProgress,
                    duration,
                    currentTrack,
                    handleNext,
                    audioRef,
                    progressBarRef
                }}/>
            </div>
        </div>
    )
}