import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import AlbumBoxes from './components/AlbumBoxes';
import TrackBoxes from './components/TrackBoxes';



const CLIENT_ID = "a7f188ae262c4517a2eb0be4519333b3";
const CLIENT_SECRET = "9234dad161ee4bba98ebcee2d12dbc09";





const App:React.FC = () => {
const [searchItem, setSearchItem] = useState<string>('')
const [accessToken, setAccessToken] = useState<string>('')
const [albums, setAlbums] = useState([])
const [tracks, setTracks] = useState([])




useEffect(() => {
  var authParameters = {
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
  }

fetch('https://accounts.spotify.com/api/token',authParameters) 
.then(result=>result.json())
.then(data=>{setAccessToken(data.access_token)})
}, [])
////////  GET THE INPUT AND LOAD THE FUNCTION ''SEARCH''
const formSubmit = (e:React.SyntheticEvent) =>{
  e.preventDefault();
  setTimeout(()=>{search()},200);
 
 // setSearchItem('')
}
async function search():Promise<void> {

//////////////////////////////////////////////////////////
var searchParameters = {
  method:'GET',
  headers: {
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + accessToken
  }
}

var artistID = await fetch('https://api.spotify.com/v1/search?q='+searchItem+'&type=artist',searchParameters)
.then(response =>response.json())
.then(data =>{return data.artists.items[0].id})

var trackID = await fetch('https://api.spotify.com/v1/search?q='+searchItem+'&type=track',searchParameters)
.then(response =>response.json())
.then(data =>{return setTracks(data.tracks.items)})

var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/'+artistID+'/albums'+'?include_groups=album&market=US&limit=50', searchParameters)
.then(response => response.json())
.then(data=>{setAlbums(data.items)})
}


  return (
    <div className="App">
      
  <InputField 
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        formSubmit={formSubmit} 
       />
      <div className="cardsContainer">
        {tracks.map(tracks=>(
          <TrackBoxes             
            tracks={tracks} />
        ))}
      
      {albums.map(AlbumBoxes)}
      </div>
      
    </div>
  );
}

export default App;
