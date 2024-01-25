import { useLoaderData, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import * as audioActions from '../../store/audioPlayer'

export default function TrackView() {
    const dispatch = useDispatch();
    const { title } = useParams();
    const track = Object.values(useLoaderData())[0];
    
    async function handleClick (e) {
        const trackData = await dispatch(audioActions.loadTrack(track.id));
        dispatch(audioActions.playTrack())
    }

    return (
        <div className="track-view">
            <span className="track-view title">{title}</span>
            <br />
            <span className="track-view artist-info">{track.artist.username}</span>
            <button onClick={handleClick}>Play this track</button>
        </div>
    )
}