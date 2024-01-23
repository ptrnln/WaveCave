import { useLoaderData } from "react-router-dom"

export default function TrackView() {
    
    let track = useLoaderData();

    

    return (
        <div className="track-view">
            This is the Track View Page for {track.title}
        </div>
    )
}