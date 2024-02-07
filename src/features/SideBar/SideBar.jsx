import React from "react";

import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Sidebar = (props) => {
  const { logged, setLogged } = props;
  const cookie = new Cookies();
  const LogmeOut = () => {
    cookie.remove("USER-NAME");
    setLogged(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md ">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand text-light" href="#">
            <h2 style={{ color: "white" }}>
              <span style={{ color: "#073259" }}>F</span>act
              <span style={{ color: "#073259" }}>B</span>ook
            </h2>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/"}>
                  <span className="nav_b">Globe</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/MyProfile"}>
                  <span className="nav_b">My Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/FriendsOnMob'} className="nav_b hide">My Friends</Link>
              </li>
              <li className="nav-item">
                <Link to={"/SugOnMob"} className="nav_b hide">Suggestion List</Link>
              </li>


              <li className="nav-item">
                <Link to={"/AddPost"}>
                  <span className="nav_b">Add Post</span>
                </Link>
              </li>
              <li className="nav-item">
                  <Link to={"/Settings"}>
                  <span className="nav_b">Settings</span>
                  </Link>
              </li>
              
              <li className="nav-item">
                <button className="signOut" onClick={LogmeOut}>
                  <span className="nav_b">Sign Out</span>
                </button>
              </li>
            </ul>
          </div>
          <h5 style={{ color: "white" }}>{logged}</h5>
        </div>
      </nav>
    </>
  );
};
export default Sidebar;

//   <div className="border-end  " id="sidebar">
//   {/* <img src={img} style={{width:"50%"}} alt="logo" /> <br /> */}
//   <h1 style={{color:"white"}}><span style={{color:"#073259"}}>F</span>act<span style={{color:"#073259"}}>B</span>ook</h1>
//   <span className='text-light'>Profile Name</span>
//   <h3 className='text-light'>{logged}</h3>
//   <span style={{color:"white"}}>Following : 0</span>
//   <span style={{color:"white"}}> Followers : 0</span><br />
//   <button className='mt-3 mb-3 p-2 s_b' >New Post</button><br />
//   <button className='mt-3 mb-3 p-2 s_b'>My Profile</button> <br />
//   <button className='mt-3 mb-3 p-2 s_b'>See Friends</button> <br />
//   <button className='mt-3 mb-3 p-2 s_b'onClick={()=>setLogged(false)}>LogOut</button>
// </div>
