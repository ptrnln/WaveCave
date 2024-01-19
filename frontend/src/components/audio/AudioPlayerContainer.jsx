
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
    const isPlaying = useSelector(state => state.audio.isPlaying)
    const queue = useSelector(state => state.audio.queue)

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
    }, [trackIndex, currentTrack.duration])

    const handleNext = () => {
        if(trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
        } else {
            setTrackIndex(trackIndex + 1);
        }
        dispatch(audioPlayerActions.playTrack())
    }

    const handlePrev = () => {
    }

    const audioPlayer = <AudioPlayer {...{
        currentTrack,
        audioRef,
        progressBarRef
    }}/>

    return (
        <div className="audio-player">
            <div className="inner">
                <TrackDisplay {...{
                    trackIndex,
                    timeProgress,
                    currentTrack,
                    handleNext,
                    audioRef,
                    progressBarRef
                }}/>
                <AudioControls {...{
                    trackIndex,
                    timeProgress,
                    currentTrack,
                    handleNext,
                    audioRef,
                    progressBarRef
                }}/>
                <ProgressBar {...{
                    audioRef,
                    progressBarRef
                }}/>
                {audioPlayer}
            </div>
        </div>
    )
}