import {FC, ReactNode, useEffect} from 'react'

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
  setAlbumTracks:any
 }

 

 export const AlbumBoxes:FC<Props> = ({slicedAlbums,accessToken,index,setAlbumTracks,albumTracks}) => {
  let tracksForAlbum
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
  .then(response => response.json())
  .then(data => {

    return setAlbumTracks((prevItems: any)=>[...prevItems, data.items[0].name])
  
  })
  },[slicedAlbums.id] )





  console.log(albumTracks);

const last4 = albumTracks.slice(-4)

  return (
   // <a href={slicedAlbums.external_urls.spotify}  rel="noreferrer noopener" target="_blank">
       
    <div className='albumCard'>
      <div className='albumCard__imageAndTracks'>
      <img  src={slicedAlbums.images[0].url} alt="respective album pic" />
      <div>
 <h3>
{last4[index]}
 </h3>
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



