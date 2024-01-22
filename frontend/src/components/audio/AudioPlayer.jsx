import { useEffect } from "react";
import { useSelector } from "react-redux"; // useDispatch
import './AudioPlayerContainer.css'
// import * as audioPlayerActions from "../../store/audioPlayer";

export default function AudioPlayer({ audioRef, progressBarRef, currentTrack, handleNext }) {
    // const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.audio.isPlaying);
    const audio =
        <audio 
            className={`track ${currentTrack.title}`}
            src={currentTrack.src}
            ref={audioRef}
            onEnded={handleNext}
        />

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            debugger
        }
    }, [isPlaying, currentTrack, audioRef])



    return (
        <>
            {audio}
        </>
    )
}