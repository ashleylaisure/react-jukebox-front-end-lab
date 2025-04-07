

const TrackDetails = (props) => {

    return (
        <div>
            {!props.selected ? (<h2>Play a track for more information</h2>) : (
                <div>
                    <h1>Now Playing</h1>
                    <h2>Title: {props.selected.title}</h2>
                    <h3>Artist: {props.selected.artist}</h3>

                    <div>
                        <button onClick={() => props.handleFormView(props.selected)}>Edit Track</button>
                        <button onClick={() => props.handleDeletePet(props.selected._id)}>Delete Track</button>
                    </div>
                </div>

            )} 
        
        </div>
    )
}

export default TrackDetails;