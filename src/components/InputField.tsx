import React from 'react'


interface Props {
  searchItem:string;
  setSearchItem:React.Dispatch<React.SetStateAction<string>>;
  formSubmit:(e:any) =>void
}

 const InputField:React.FC<Props> = ({searchItem,setSearchItem,formSubmit})=> {

  
    return (
   
         <form  className='input' >
<input className='input__box' type="text"
  value={searchItem}
   onChange={
    (e)=>{setSearchItem(e.target.value);formSubmit(e)}
        } 
       
        />
        <button type='submit' className='input_submit' onClick={(e)=>formSubmit(e)}>Search</button>
   </form>
  
    )
  
}

export default InputField

// 