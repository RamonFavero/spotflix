import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import AlbumBoxes from './components/AlbumBoxes';
import TrackBoxes from './components/TrackBoxes';
import { IconContext } from 'react-icons';
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { TbArrowBigRightFilled } from "react-icons/tb";

const CLIENT_ID = "a7f188ae262c4517a2eb0be4519333b3";
const CLIENT_SECRET = "9234dad161ee4bba98ebcee2d12dbc09";





const App:React.FC = () => {
  
const [searchItem, setSearchItem] = useState<string>('')
const [accessToken, setAccessToken] = useState<string>('')
const [albums, setAlbums] = useState([])
const [tracks, setTracks] = useState([])
const [zero, setZero] = useState(0)
const [one, setOne] = useState(7)

let slicedTracks = tracks.slice(zero, one)




const nextCard = (e:any) => {
console.log(e.target.parentElement.name);

if (e.target.parentElement.name==='foward') {
  if (one===20) {
    return
  }else {
  setZero(zero+1);
  setOne(one+1);
  }
} else if (e.target.parentElement.name==='backward') {
  if (zero===0) {
    return
  }else {
  setZero(zero-1);
  setOne(one-1);
}
}

  console.log(zero);
  console.log(one);
  
  slicedTracks = tracks.slice(zero, one)
}


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
.then(data =>{return setTracks(data.tracks.items.map((track: { artists: { name: string; }[]; name: string; uri: string; album: { images: {url:string}[]; }; duration_ms: number; }) =>{
  return {
    artist: track.artists[0].name,
    title: track.name,
    uri: track.uri,
    albumImage: track.album.images[0].url,
    duration: track.duration_ms
  }
}))
})  


var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/'+artistID+'/albums?include_groups=album&market=US&limit=50', searchParameters)
.then(response => response.json())
.then(data=>{return setAlbums(data.items);
})
}


  return (
    <IconContext.Provider value={{ size: '1.2em'}}>
    <div className="App">
      
  <InputField 
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        formSubmit={formSubmit} 
       />
       <div className='rowOfCards'>
      <div className="cardsContainer">
      <button name='backward' onClick={(e)=>nextCard(e)}>
  <span className="text"><TbArrowBigLeftFilled/></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  </button>
        {slicedTracks.map(tracks=>(
          <TrackBoxes             
            tracks={tracks} />
        ))}
      <button name='foward' onClick={(e)=>nextCard(e)}>
  <span className="text"><TbArrowBigRightFilled/></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  <span className="blob"></span>
  </button>
      {albums.map(AlbumBoxes)}
      </div>
      </div>
      
    </div>
    </IconContext.Provider>
  );
}

export default App;
