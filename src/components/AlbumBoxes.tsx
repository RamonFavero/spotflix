
import {FC, ReactNode, useEffect, useState, MouseEvent } from 'react'

import { FaPlay } from "react-icons/fa";

interface Props {
 
  slicedAlbums:{
    length: number;
    id: string;
    release_date: string;
    external_urls: {spotify:string}
    images: {
     url:string
    }[];
    name:string;
   }
   index:any
   albumTracks:ReactNode[]
  accessToken:string
  setAlbumTracks:React.Dispatch<React.SetStateAction<any[]>>
 }

 

 export const AlbumBoxes:FC<Props> = ({slicedAlbums,accessToken,index,setAlbumTracks,albumTracks}) => {

 const [renderTracks, setRenderTracks] = useState(false)
  function reverseDate(str: string){
    return str.split('-').reverse().join('/');
  }



    var searchParameters = {
      method:'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + accessToken
      }
    }
useEffect(() => {
  var searchAlbumTracks = fetch ('https://api.spotify.com/v1/albums/'+slicedAlbums.id+'/tracks?include_groups=album&market=US&limit=3', searchParameters)
  .then(response => {
   if (response.status===200) {
     
     setTimeout(() => {
      setRenderTracks(true)
     }, 300);
   }
   return response.json()})
  .then(data => {
    return setAlbumTracks((prevItems: any)=>[...prevItems, data.items])
  })
  },[slicedAlbums.id] )



const handleHover = (e:MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>) => {
  
  let text = e.currentTarget.innerHTML
console.log(text.length);

}


const last4:any[] = albumTracks.slice(-4)


  return (
   // <a href={slicedAlbums.external_urls.spotify}  rel="noreferrer noopener" target="_blank">
       
    <div className='albumCard'>
      <div className='albumCard__imageAndTracks'>
      <img  src={slicedAlbums.images[0].url} alt="respective album pic" />
      <div className='TracksInsideAlbums'>
 
{renderTracks? 
 
  last4[index].map((
      tracksOfAlbum: { name: string, uri:string })=>(
       <div  className='albumCard__rowOfTracks onHoverSlideRight3'>
       
         <a href={tracksOfAlbum.uri} style={{backgroundImage:`linear-gradient(to left,#f04b4b, #9198e5)`, }} className='play_button'  type='button'><FaPlay  /></a>
        
        <div className='TracksInsideAlbums__h3--div'>
         <h3 className='TracksInsideAlbums__h3' onMouseOver={(e)=>{handleHover(e) }}  >{tracksOfAlbum.name}</h3>
         </div>
       </div>
      ))

  : ''} 

  </div> 
      </div>
      <div className='albumCard__Name--text'>
      <h3 className='albumCard__h3'>{slicedAlbums.name}</h3>
      <h6>{reverseDate(slicedAlbums.release_date)}</h6>
      </div>
      </div>
    
   // </a>
  )
}



