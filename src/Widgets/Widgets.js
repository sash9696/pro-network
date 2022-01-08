import React from 'react';
import './Widgets.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InfoIcon from '@material-ui/icons/Info'
import { newsItems } from './NewsItems';

function Widgets() {

    const news = (headlines, subtitles) => (

        <div className="widgets">
            <div className="widgets_left">
                <FiberManualRecordIcon style={{height:'10px', width:'10px'}}/>
            </div>
            <div className="widgets_right">
                <p className='headlines'>{headlines}</p>
                <p className='subtitles'>{subtitles}</p>
            </div>
                
        </div>
        
    )
    return (
        <div className='widget_container'>
            <div className="widgets_header">
                <h2>Pro Network News</h2>
                <InfoIcon/>
            </div>

            {newsItems.map((value) => (
                news(value.headline, value.subtitle)
            ))}   

            
            
        </div>
    )
}

export default Widgets;
