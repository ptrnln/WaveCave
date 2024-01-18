export default function AudioPlayer({ currentTrack, handleNext }) {
    debugger
    
    console.log('audio player rerender')

    const audio =
        <audio 
            className={`track ${currentTrack.title}`}
            src={currentTrack.src}
        ></audio>

    return (
        <>
            {audio}
        </>
    )
}