import React from 'react';
import "./AboutUs.css";
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/')
    }

  return (
    <div className='about_us'>
        <p className='about_us_title'>About Us</p>
        <p className='about_us_para1'>- Pro Network is a platform where people can create professional networks, talk with with various professionals by communicating, sharing knowledge, guiding people, get guided by people and so on.</p>
        <p className='about_us_para2'>- At Pro Network, we have designed a system that works well for both students and professionals, and streamlined the networking/mentoring process making it easy and efficient.</p>
        <p className='about_us_para2'>- Join the amazing community of immense professionals and start helping/benefitting from awesome posts!</p>
        <Button style={{marginRight: "20px", marginTop: '40px', fontSize: '18px', border: 'none', color: "#0047ab"}} onClick={goToHomePage} variant="outlined">Go to Home</Button>
    </div>
  )
}

export default AboutUs