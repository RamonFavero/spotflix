import React, { FC } from 'react'


interface Props {
  release_date: string;
  external_urls: any;
  map(albumCards: FC<Props>): import("react").ReactNode;
  images: any;
  

  name:string;
}

const AlbumBoxes:React.FC<Props> = (Albums) => {
  function reverseDate(str: string){
    return str.split('-').reverse().join('/');
  }



  return (
    <a href={Albums.external_urls.spotify}  rel="noreferrer noopener" target="_blank">
    <div className='albumCard'>
      <img  src={Albums.images[0].url} alt="respective album pic" />
      <div className='albumCard__Name--text'>
      <h3 className='albumCard__h3'>{Albums.name}</h3>
      <h6>{reverseDate(Albums.release_date)}</h6>
      </div>
      </div>
    
    </a>
  )
}

export default AlbumBoxes


