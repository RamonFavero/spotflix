import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import {AlbumBoxes} from './components/AlbumBoxes';
import TrackBoxes from './components/TrackBoxes';
import ButtonArrow from './components/ButtonArrow';


const CLIENT_ID = "a7f188ae262c4517a2eb0be4519333b3";
const CLIENT_SECRET = "9234dad161ee4bba98ebcee2d12dbc09";




const App:React.FC = () => {
  
const [searchItem, setSearchItem] = useState<string>('')
const [accessToken, setAccessToken] = useState<string>('')
const [albums, setAlbums] = useState<any[]>([])
const [albumTracks, setAlbumTracks] = useState([])
const [tracks, setTracks] = useState([])
const [zero, setZero] = useState<number>(0)
const [one, setOne] = useState<number>(7)
const [two, setTwo] = useState<number>(0)
const [three, setThree] = useState<number>(4)

let slicedTracks = tracks.slice(zero, one)
let slicedAlbums = albums.slice(two, three)



const nextCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {target:HTMLButtonElement}):void => {
  const { name } = e.target.parentElement as HTMLButtonElement;

if (name ==='fowardalbum') {
  if (three===10) {
    return
  }else {
  setTwo(two+1);
  setThree(three+1);
  }
} else if (name ==='backwardalbum') {
  if (two===0) {
    return
  }else {
  setTwo(two-1);
  setThree(three-1);
}

}if (name ==='foward') {
  if (one===20) {
    return
  }else {
  setZero(zero+1);
  setOne(one+1);
  }
} else if (name ==='backward') {
  if (zero===0) {
    return
  }else {
  setZero(zero-1);
  setOne(one-1);
}
}
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

const formSubmit = (e:React.SyntheticEvent) =>{
  e.preventDefault();
  
  setTimeout(()=>{search()},200);
}

async function search():Promise<void> {

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

var returnedAlbums = await fetch ('https://api.spotify.com/v1/artists/'+artistID+'/albums?include_groups=album&market=US&limit=15', searchParameters)
.then(response => response.json())
.then(data=>{return setAlbums(data.items);
})





}



  return (
    
    <div className="App">
      
  <InputField 
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        formSubmit={formSubmit} 
       />
       <div className='rowOfCards'>
       {tracks.length? 
       <div className="cardsContainer">
     <ButtonArrow nextCard={nextCard} buttonName='backward' />
        {slicedTracks.map(tracks=>(
          <TrackBoxes             
            tracks={tracks} />
        ))}
      <ButtonArrow nextCard={nextCard} buttonName='foward' />
      
      </div> :''}
      {albums.length? 
      <div className="cardsContainer">
        <ButtonArrow nextCard={nextCard} buttonName='backwardalbum' />
        
      {slicedAlbums.map((slicedAlbums,index)=>(
        <AlbumBoxes 
          slicedAlbums={slicedAlbums}
          accessToken={accessToken}
          index={index}
          albumTracks={albumTracks}
          setAlbumTracks={setAlbumTracks}
          />
      ))}

      <ButtonArrow nextCard={nextCard} buttonName='fowardalbum' />
      
      </div>
      :''}
      
      </div>
      
    </div>
  );
}
// SE ALGO APARECER COM " does not exist on type 'IntrinsicAttributes & Props'" É PORQUE A VARIAVEL NAO ESTA PASSANDO DA FORMA CORRETA NO COMPONENTE E NO TYPESCRIPT
export default App;
