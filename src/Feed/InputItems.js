import React from 'react';
import './InputItems.css'

function InputItems({Icon, title, color, like, comment, onLikeClick}) {
    return (
        <div onClick={onLikeClick} className='inputItems'>
            {Icon && <Icon style = {{color:color}} />}
            <p>{title}</p>
            {like ?  <p>{like}</p> : "" }
            {comment ? <p>{comment}</p> : "" }
            

            
        </div>
    )
}

export default InputItems
