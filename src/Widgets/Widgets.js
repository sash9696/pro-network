import React from 'react';
import './Widgets.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import InfoIcon from '@material-ui/icons/Info'
import Info from './Info';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from './keys';

function Widgets({check, setCheck}) {
    const [info, setInfo] = useState(false)
    const [newsItem, setNewsItem] = useState([])
    const handleInfo = () => {
        setInfo(!info)
        return <Info/>
    }
    const newsApi = async () => {
        try{
            const news = await axios.get(
              `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&pageSize=5`
            );
            console.log(news.data.articles)
            setNewsItem(news.data.articles);
        }
        catch (error){
            console.log(error)
        }
      }
      useEffect(()=>{
        newsApi()
      },[])

    const news = (headlines, subtitles, link) => (
        <a style={{textDecoration: 'none'}} href={link} target="_blank">
            <div  className="widgets">
                <div className="widgets_left">
                    <FiberManualRecordIcon style={{height:'10px', width:'10px'}}/>
                </div>
                <div className="widgets_right">
                    <p className='truncate'>{headlines}</p>
                    <p className='subtitles'>{subtitles}</p>
                </div>
            </div>
        </a>                
    )
    return (
        <div className='widget_container'>
            <div className="widgets_header">
                {info && <Info 
                        info={info} 
                        setInfo={setInfo} 
                        message=" These are the  top professional news stories and conversations. "
                        check={check}
                        setCheck={setCheck}
                        />}
                <h2>Pro Network News</h2>
                <InfoIcon className='info-icon' onClick={handleInfo}/>
            </div>

            {newsItem.map((value, index) => (
                <div key={index} className="single-news">
                    {news(value?.title, value?.source.name, value.link)}
                </div>
                
            ))}   
            
        </div>
    )
}

export default Widgets;
