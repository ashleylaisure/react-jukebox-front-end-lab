

const TrackList = (props) => {
    // console.log(props)

    return (
        <div>
            <h1>Track List</h1>
            <div>
                {!props.tracks.length ? (<h2>No Music Tracks</h2>) : (
                    <ul>
                        {props.tracks.map((track) => (
                            <div>
                                <button key={track._id} onClick={() => props.handleSelect(track)}> {track.title} ⯈</button>
                            </div>
                            
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={props.handleFormView}>{props.isFormOpen ? "Close Form" : "Add A Track"}</button>
        </div>
    )
}

export default TrackList;