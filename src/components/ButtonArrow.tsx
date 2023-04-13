import React from 'react'

interface ButtonArrowProps {
  buttonName:string
  nextCard:(e:any)=> void;
}

const ButtonArrow:React.FC<ButtonArrowProps>=({nextCard, buttonName})=> {
  return (
    <button className='leftButton' name={buttonName} onClick={(e)=>nextCard(e)}>
  <span className="text"></span>
  </button>
  )
}

export default ButtonArrow
