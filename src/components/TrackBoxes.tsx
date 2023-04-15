import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { FaPlay } from "react-icons/fa";
import Props from "./modal"


const TrackBoxes:React.FC<Props> = ({tracks}) => {
  let slideRight= false
let onHoverSlideRight= ''
  const convertMStoMT = (milliseconds: number) =>{
let seconds = Math.floor(milliseconds / 1000)
let seconss= Math.round((milliseconds % 60000)/1000)
let minutes = Math.floor(seconds / 60)
if (seconss<10) {return minutes+":0"+seconss}
return minutes+":"+seconss
}



switch (true) {
  case (tracks.title.length >= 17 && tracks.title.length <= 20):
    onHoverSlideRight = 'onHoverSlideRight';
    slideRight = true;
    break;
  case (tracks.title.length >= 21 && tracks.title.length <= 26):
    onHoverSlideRight = 'onHoverSlideRight2';
    slideRight = true;
    break;
  case (tracks.title.length >= 27 && tracks.title.length <= 31):
    onHoverSlideRight = 'onHoverSlideRight3';
    slideRight = true;
    break;
  case (tracks.title.length >= 32 && tracks.title.length <= 50):
    onHoverSlideRight = 'onHoverSlideRight4';
    slideRight = true;
    break;
  case (tracks.title.length >= 51 && tracks.title.length <= 100):
    onHoverSlideRight = 'onHoverSlideRight5';
    slideRight = true;
    break;
}


 





 
  return (
    <IconContext.Provider value={{ size: '1.2em'}}>
    <div>
      <div className={`trackCard ${slideRight? `${onHoverSlideRight}`:''}` }>
      <img  src={tracks.albumImage} alt="respective album pic" />
      <div className='albumCard__Name--text'>
        <div className='trackCard__timeandplay'>
      <h3 className='albumCard__h3' >{tracks.title}</h3>
      <h4>{tracks.artists}</h4>
      </div>
      <div className='trackCard__timeandplay'>
      <a href={tracks.uri} className='play_button'  type='button'><FaPlay  /></a>
      <h6>{convertMStoMT(tracks.duration)}</h6>
      
      </div>
      </div>
      </div>
    </div>
    </IconContext.Provider>
  )
}

export default TrackBoxes
