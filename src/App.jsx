import { useState, useEffect } from 'react'
import * as trackService from './services/trackService.js'

import TrackList from './components/TrackList/TrackList.jsx'
import TrackDetails from './components/TrackDetails/TrackDetails.jsx'
import TrackForm from './components/TrackForm/TrackForm.jsx'

import './App.css'

function App() {
  const [tracks, setTracks] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSelect = (track) => {
    // console.log("selected", track)
    setSelected(track)
    setIsFormOpen(false)
  }

  const handleFormView = (track) => {
    if (!track._id) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData)
      // console.log(newTrack)

      if(newTrack.err) {
        throw new Error(newTrack.err)
      }

      setTracks([...tracks, newTrack])
      setIsFormOpen(false)

    } catch (err ) {
      console.log(err)
    }

  }


  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId)
      // console.log(updatedTrack)

      if(updatedTrack.err) {
        throw new Error(newTrack.err)
      }

      const newTrackList = tracks.map((track) => (track._id !== updatedTrack._id ? track : updatedTrack))
      setTracks(newTrackList)
      setSelected(updatedTrack)
      setIsFormOpen(false)
      

    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePet = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)
      // console.log(deletedTrack)

      if(deletedTrack.err) {
        throw new Error(newTrack.err)
      }

      const updatedTrackList = tracks.filter((track) => track._id !== deletedTrack._id)
      setTracks(updatedTrackList)
      setSelected(null)
      setIsFormOpen(false)

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    
    const fetchTracks = async () => {
      try{
        const fetchedTracks = await trackService.index()

        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err)
        }

        setTracks(fetchedTracks)

      } catch (err) {
        console.log(err)
      }
    }

    fetchTracks();

  }, [])

  return (
    <>
      <h1>Your Jukebox</h1>
      
      <TrackList tracks={tracks} handleSelect={handleSelect} handleFormView={handleFormView} isFormOpen={isFormOpen}/>

      {isFormOpen ? (<TrackForm handleAddTrack={handleAddTrack} selected={selected} handleUpdateTrack={handleUpdateTrack}/>) 
        : (<TrackDetails selected={selected} handleFormView={handleFormView} handleDeletePet={handleDeletePet}/>)}
      
    </>
  )
}

export default App;
