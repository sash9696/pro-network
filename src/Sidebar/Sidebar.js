// import React from 'react';
// import './Sidebar.css';
// import { Avatar } from "@material-ui/core";
// import {useSelector} from 'react-redux';
// import { selectUser } from '../features/counterSlice';

// function Sidebar({avatar}) {
//     const user = useSelector(selectUser);
//     return (
//         <div className='sidebar_container'>
//             <div className="sidebar_contents">
//                 <img className='sidebar_image' 
//                     src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
//                     alt=""/>
//                 <p>{avatar  && <Avatar  className='sidebar_avatar' src={user.photoUrl}>
//                         {user.email[0]}
//                     </Avatar>}</p>
//                 <h2>{user.displayName}</h2>
//                 <p className='sidebar_mail'>{user.email}</p>
//                 <div className="sidebar_post">
//                     <div className='sidebar_post1'><p>Who viewed you</p><span className='a'>2421</span></div>
//                     <div className='sidebar_post1'><p>Views on post</p><span className='b'>2526</span></div>
                    
//                 </div>
//             </div>
//             <div className="sidebar_contents2">
//                 <h3>Recents</h3>
//                 <p className='sidebar_hash'># React.js</p>
//                 <p className='sidebar_hash'># Programming</p>
//                 <p className='sidebar_hash'># Software</p>
//                 <p className='sidebar_hash'># Desigining</p>
//                 <p className='sidebar_hash'># Developer</p>
//             </div>
            
//         </div>
//     )
// }

// export default Sidebar
import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./Sidebar.css";

function Sidebar () {
  const user  = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
          alt=""
        />
        <Avatar src={user?.photoUrl || ""} className="sidebar__avatar">
            {user.email[0].toUpperCase()}
        </Avatar>
        <h2>{user?.displayName}</h2>
        <h4>{user?.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,300</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">2,570</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("softwareengineering")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  );
};

export default Sidebar;
