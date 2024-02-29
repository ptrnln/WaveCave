import { Outlet, useLoaderData, useParams } from "react-router-dom"
import './TrackView.css'
import { useDispatch } from "react-redux";
import * as audioActions from '../../store/audioPlayer'

export default function TrackView() {
    const dispatch = useDispatch();
    const { title } = useParams();
    const track = Object.values(useLoaderData())[0];
    
    async function handleClick (e) {
        const trackData = await dispatch(audioActions.loadTracks([track.id]))
        dispatch(audioActions.playTrack());
    }

    return (
            window.location.href.match(new RegExp('[^/]+(?=/$|$)'))[0] === 'update' ?
            
            <Outlet />
            :
            <div className="track-view container">
                <h1 className="track-view title">{title}</h1>
                <br />
                <div className="track-view artist-info">
                    <p>{track.artist.username}</p>
                </div>
                <br />
                <div className="track-view description">
                    <p>{track.description}</p>
                </div>
                <button onClick={handleClick}>Play this track</button>
            </div>
    )
}