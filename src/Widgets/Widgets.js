import React from 'react';
import './Widgets.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InfoIcon from '@material-ui/icons/Info'
import { newsItems } from './NewsItems';
import Info from './Info';
import { useState } from 'react';

function Widgets() {
    const [info, setInfo] = useState(false)
    const handleInfo = () => {
        setInfo(!info)
        return <Info/>
    }

    const news = (headlines, subtitles, link) => (
        <a style={{textDecoration: 'none'}} href={link} target="_blank">
            <div className="widgets">
                <div className="widgets_left">
                    <FiberManualRecordIcon style={{height:'10px', width:'10px'}}/>
                </div>
                <div className="widgets_right">
                    <p className='headlines'>{headlines}</p>
                    <p className='subtitles'>{subtitles}</p>
                </div>
            </div>
        </a>                
    )
    return (
        <div className='widget_container'>
            <div className="widgets_header">
                {info && <Info info={info} setInfo={setInfo} />}
                <h2>Pro Network News</h2>
                <InfoIcon className='info-icon' onClick={handleInfo}/>
            </div>

            {newsItems.map((value, index) => (
                <div key={index} className="single-news">
                    {news(value.headline, value.subtitle, value.link)}
                </div>
                
            ))}   
            
        </div>
    )
}

export default Widgets;
