import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import csrfFetch from "../../store/csrf";
import './TrackUpdateForm.css';
import * as trackActions from '../../store/track'
import { useSelector } from "react-redux";


const GENRES = [
    "Pop",
    "Rock",
    "Country", 
    "Hip-Hop", 
    "EDM"
]

const SUPPORTED_FILE_TYPES = [
    'mp3',
    'wav',
    'flac'
]

const generateFileTypeRegEx = (fileTypeList) => {
    return new RegExp(`^.*\\.(${fileTypeList.join('|')})$`) 
}

export default function TrackUpdateForm() {
    const navigate = useNavigate();

    const [newTitle, setNewTitle] = useState('');
    const [description, setDiscription] = useState('');
    const [genre, setGenre] = useState(GENRES[0]);
    const [isNewGenre, setIsNewGenre] = useState(false);
    const [isAlbum, setIsAlbum] = useState(false);
    const [duration, setDuration] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [errors, setErrors] = useState([]);
    const [trackData, setTrackData] = useState('');
    const [trackId, setTrackId] = useState(null);
    const [fileType, setFileType] = useState('');

    const currentUser = useSelector(state => state.session.user)

    const { title, username } = useParams();



    const audioReader = new FileReader();
    const imageReader = new FileReader();

    useEffect(() => {
        async function getTrackData() {
            const response = await csrfFetch(`/api/users/${username}/tracks/${title}`);

            if(response.ok) {
                const data = await response.json();
                const trackData = Object.values(data.track)[0]

                const image = new Image();
                image.src = trackData.photoUrl
                setTrackId(Object.keys(data.track)[0])
                setNewTitle(title)
                setDiscription(trackData.discription || '');
                setGenre(trackData.genre);
                setIsNewGenre(!GENRES.includes(trackData.genre));
                setDuration(trackData.duration);
                setAudioFile(await fetch(trackData.sourceUrl));
                setFileType(trackData.fileType)
                setImageFile(trackData.photoUrl.length ? trackData.photoUrl : null);
                
                return data
            } else {
                const data = await response.json()
                setErrors(data.errors)
                return data
            }
        }
        getTrackData();
    }, [])

    debugger
    
    const getFileType = (fileName) => {
        debugger
        return fileName.match(generateFileTypeRegEx(SUPPORTED_FILE_TYPES))[1]
    }


    async function handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        setErrors([]);
        const response = await trackActions.updateTrack({
            id: trackId,
            title,
            description,
            genre,
            duration,
            fileType
        }, audioFile, imageFile);
        
        if(response.errors) {

            setErrors(response.errors)
        } else {
            navigate(`/${currentUser.username}/${newTitle.replace(' ', '-')}`)
        }
    }


    return(
        <form 
            className="track-update" 
            htmlFor="track-update"
            onSubmit={handleSubmit}>
            <label htmlFor="title">Title:
                <br />
                <input 
                type="text" 
                className="title-input"
                onChange={(e) => {
                    e.preventDefault();
                    setNewTitle(e.target.value);
                }}
                value={newTitle}
                />
            </label>
            <label htmlFor="description">Description:
                <br />
                <textarea 
                    name="description input" 
                    id="description input" 
                    cols="30" 
                    rows="4" 
                    onChange={(e) => {
                        e.preventDefault();
                        setDiscription(e.target.value);
                    }}
                    value={description}
                    style={{resize: 'none'}}
                />
            </label>
            <label htmlFor="genre">Genre:
                <br />
                <select 
                    name="genre select" 
                    id="genre select" 
                    onChange={(e) => {
                        e.preventDefault();
                        if(e.target.value === "other") setIsNewGenre(true);
                        if(GENRES.includes(e.target.value)) {
                            setIsNewGenre(false);
                            setGenre(e.target.value);
                        }
                    }}
                    value={ isNewGenre ? "other" : genre }
                >
                    {
                        ...GENRES.map((genre) => (<option value={genre}>{genre}</option>))
                    }
                    <option value="other">Other</option>
                </select>
                {isNewGenre ? 
                <>
                    <label htmlFor="genre text-field">
                        <input 
                            type="text" 
                            className="genre input"
                            onChange={(e) => {
                                e.stopPropagation();
                                setGenre(e.target.value);
                            }}
                            value={isNewGenre ? genre : ''}
                        />
                    </label>
                </> 
                :
                ''}
            </label>
            <label htmlFor="audio-file">Add an audio file 
            <span 
                style={{
                    fontStyle: 'italic',
                    fontSize: 'xx-small'
                }}> (accepts '.wav', '.mp3', and '.FLAC' file types, leave blank to let file unchanged):
            </span>
                <br />
                <input 
                    type="file" 
                    className="audio-file input" 
                    accept=".wav,.mp3,.flac"
                    // multiple
                    onChange={async (e) => {
                        e.stopPropagation();
                        setAudioFile(e.target.files[0]);
                        setDuration(await getDuration(e.target.files[0]));
                        setFileType(getFileType(e.target.files[0]))
                    }}
                />
            </label>
            <label htmlFor="image-file">Add an image file 
            <span 
                style={{
                    fontStyle: 'italic',
                    fontSize: 'xx-small'
                }}> (accepts '.jpeg', '.jpg', and '.png' file types, leave blank to let file unchanged):
            </span>
                <br />
                <input 
                    type="file" 
                    className="image-file input" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                        e.stopPropagation();
                        setImageFile(e.target.files[0]);
                    }}
                />
            </label>
            <label htmlFor="errors">{errors.length ? errors.join(", ") : null}</label>
            <button type="submit">Submit</button>
        </form>
    )
}