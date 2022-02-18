import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji';


 function Example ({value, onChange, onClick}) {
//   const [ text, setText ] = useState('')

  return (
      <div className="emoji">
         <InputEmoji
            className='emoji'
            value={value}
            onChange={onChange}
            onClick={onClick}
            cleanOnEnter
            placeholder="Type a message"
            />
            <button  type='submit'>Submit</button>  

      </div>
    
  )
}



export default Example

