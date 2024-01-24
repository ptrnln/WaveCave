import { useEffect } from "react";
import { useSelector } from "react-redux"; // useDispatch
import './AudioPlayerContainer.css'
// import * as audioPlayerActions from "../../store/audioPlayer";

export default function AudioPlayer({ audioRef, progressBarRef, handleNext }) {
    // const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.tracks[state.audio.currentTrackId])
    const isPlaying = useSelector(state => state.audio.isPlaying);
    debugger
    const audio = <audio 
            className={`audio-track ${currentTrack?.title || ''}`}
            ref={audioRef}
            onEnded={handleNext}
        />


    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    useEffect(() => {
        // if(currentTrack?.sourceUrl && currentTrack?.sourceName) {
        //     audio.src = currentTrack.sourceUrl
        // }
        if(currentTrack !== undefined) {
            debugger
            // audio.src = currentTrack.sourceUrl
            document.getElementsByClassName('audio-track')[0].src = currentTrack.sourceUrl
        }
    }, [currentTrack])



    return (
        <>
            {audio}
        </>
    )
}