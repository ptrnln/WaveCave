import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom"
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
                <div className="track-view body">
                    { track.photoUrl ? <img src={track.photoUrl} /> : <i className="fa-solid fa-compact-disc" />}
                    <div className="track-view details">
                        <div className="track-view artist-info">
                            <NavLink to={`/${track.artist.username}`}><i className="fa-solid fa-user" /> {track.artist.username}</NavLink>
                        </div>
                        <br />
                        <div className="track-view description">
                            <p>{track.description}</p>
                        </div>
                    </div>
                </div>
                <button onClick={handleClick}>Play this track</button>
            </div>
    )
}