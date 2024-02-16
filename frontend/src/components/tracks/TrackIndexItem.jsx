import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import * as trackActions from '../../store/track'
import * as audioPlayerActions from '../../store/audioPlayer'
import { useEffect } from "react";
import csrfFetch from "../../store/csrf";


export default function TrackIndexItem({ track }) {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    debugger

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


    return (
        <div className="track-index item">
            <h2>{track.title}</h2>
            <p>{track.artist.username}</p>
            <img src={track.photoUrl} style={{"max-width": "80px"}}alt="" />
            <NavLink to={`/${track.artist.username}/${track.title.replace(' ', '-')}`}>See track</NavLink>
            {track.artist.id === currentUser?.id }
        </div>
    )
}