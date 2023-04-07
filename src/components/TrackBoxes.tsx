import React from 'react'
import { IconContext } from 'react-icons';
import { FaPlay } from "react-icons/fa";
import Props from "./modal"


const TrackBoxes:React.FC<Props> = ({tracks}) => {
  let slideRight = false;

  const convertMStoMT = (milliseconds: number) =>{
let seconds = Math.floor(milliseconds / 1000)
let seconss= Math.round((milliseconds % 60000)/1000)
let minutes = Math.floor(seconds / 60)
if (seconss<10) {return minutes+":0"+seconss}
return minutes+":"+seconss
}



 if (tracks.title.length > 18) {
  slideRight=true;
};





 
  return (
    <IconContext.Provider value={{ size: '1.2em'}}>
    <div>
      <div className={`trackCard ${slideRight? 'onHoverSlideRight':''}` }>
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
