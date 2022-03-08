import React from 'react';
import './Info.css'
import ClearIcon from '@material-ui/icons/Clear'

function Info({info, setInfo}) {

    const closeInfo = () => {
        setInfo(!info)
    }
  return (
    <div className='info'>
        <div className="info-content">
            <p>
            These are the  top professional news stories and conversations.
            </p> 
        </div>
      <ClearIcon className='close-icon' onClick={closeInfo}/>
    </div>
  )
}

export default Info;