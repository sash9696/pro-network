import React from 'react';
import './InputItems.css'

function InputItems({Icon, title, color, like, comment, onClick}) {
    return (
        <div onClick={onClick} className='inputItems'>
            {Icon && <Icon style = {{color:color}} />}
            {like ?  <p>{like}</p> : "" }
            <p>{title}</p>
            {comment ? <p>{comment}</p> : "" }
        </div>
    )
}

export default InputItems
