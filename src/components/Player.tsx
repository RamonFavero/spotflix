import React from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

interface Props {
    accessToken:string;
    trackUri:any
    access_token:any
    
}

const Player:React.FC<Props> = ({accessToken,trackUri}) => {

  if (!accessToken) return null
  return (
   <SpotifyPlayer 
   token={accessToken} 
   showSaveIcon
   uris={trackUri? [trackUri]:[]}  
   />
  )
}

export default Player
