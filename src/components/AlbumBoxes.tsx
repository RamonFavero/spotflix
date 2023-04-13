import {FC} from 'react'

interface Props {
 
  slicedAlbums:{
    release_date: string;
    external_urls: {spotify:string}
    images: {
     url:string
    }[];
    name:string;
   }
  albumTracks:any
 }

 

 export const AlbumBoxes:FC<Props> = ({slicedAlbums,albumTracks}) => {
  
  function reverseDate(str: string){
    return str.split('-').reverse().join('/');
  }

console.log(albumTracks);



  return (
    <a href={slicedAlbums.external_urls.spotify}  rel="noreferrer noopener" target="_blank">
    <div className='albumCard'>
      <div className='albumCard__imageAndTracks'>
      <img  src={slicedAlbums.images[0].url} alt="respective album pic" />
      <div>
        
        {albumTracks.map(({name}:any)=>(<h3>{name}</h3>))}
        
      </div>
      </div>
      <div className='albumCard__Name--text'>
      <h3 className='albumCard__h3'>{slicedAlbums.name}</h3>
      <h6>{reverseDate(slicedAlbums.release_date)}</h6>
      </div>
      </div>
    
    </a>
  )
}



