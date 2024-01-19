import { useEffect } from "react";
import { useSelector } from "react-redux"; // useDispatch
// import * as audioPlayerActions from "../../store/audioPlayer";

export default function AudioPlayer({ audioRef, currentTrack, handleNext }) {
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
            audioRef.current.pause()
        }
    }, [isPlaying, audioRef])

    return (
        <>
            {audio}
        </>
    )
}