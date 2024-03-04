import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as trackActions from '../../store/track'
import * as audioPlayerActions from '../../store/audioPlayer'
import './TrackIndexItem.css'
import csrfFetch from "../../store/csrf";


export default function TrackIndexItem({ track }) {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const tracks = useSelector(state => state.tracks)

    async function handleDelete (e) {
        
        e.preventDefault();
        await dispatch(audioPlayerActions.unloadTrack(e.target.value));
        await dispatch(trackActions.removeTrack(e.target.value));
        const response = await csrfFetch(`/api/tracks/${e.target.value}`, {
            method: 'DELETE'
        })
        
        if(response.ok) {
            let data = await response.json();
            return data;
        } else {
            console.alert('could not delete');
        }
    }

    const navToUpdate = () => {
        navigate(`/${track.artist.username}/${track.title}/update`)
    }

    return (
        <div className="track-index item">
            { track.photoUrl ? <img src={track.photoUrl} style={{"maxWidth": "80px"}} alt="" /> : <i className="fa-solid fa-compact-disc" style={{"fontSize": "80px"}}></i> }
            <div id={`track-${track.id}-details`} className="track-index details">
                <h2>{track.title}</h2>
                <p>{track.artist.username}</p>
            <NavLink to={`/${track.artist.username}/${track.title.replace(' ', '%20')}`}>See track</NavLink>
            </div>
            {track.artist.id === currentUser?.id ? <button onClick={handleDelete} value={track.id}>Delete</button>: false}
            {track.artist.id === currentUser?.id ? <button onClick={navToUpdate}>Update</button>: false}
        </div>
    )
}