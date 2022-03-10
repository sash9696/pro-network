import React from 'react';
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../Feed/Feed';
import Widgets from '../../Widgets/Widgets';
import './Home.css';

function Home({ search, check, setCheck }) {
  return (
    <div className='container_home'>
        <Sidebar />
        <Feed search={search} />
        <Widgets check={check} setCheck={setCheck} />
    </div>
  )
}

export default Home