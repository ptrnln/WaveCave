import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as audioPlayerActions from "../../store/audioPlayer";

export default function AudioPlayer({ audioRef, currentTrack }) {
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.audio.isPlaying);
    const audio =
        <audio 
            className={`track ${currentTrack.title}`}
            src={currentTrack.src}
            ref={audioRef}
            // onEnded={dispatch(audioPlayerActions.playNext())}
        />

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying, currentTrack])

    return (
        <>
            {audio}
        </>
    )
}