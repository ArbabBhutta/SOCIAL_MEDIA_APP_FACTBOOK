import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

import "./App.css";
import SideBar from "./features/SideBar/SideBar";

import Login from "./features/LoginIN/Login";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Posts } from "./features/Posts/Posts";
import AddPost from "./features/AddPost/AddPost.jsx";
import MyProfile from "./features/MyProfile/MyProfile";
import SuggestList from "./features/SuggestionList/SuggestList";
import SingleProfile from "./features/SignleProfile/SingleProfile";
import FriendsOnMob from './features/FriendsOnMob/FriendsOnMob';
import SugOnMob from './features/SugOnMob/SugOnMob';
import Settings from "./Settings/Settings";

function App() {
  const getCookie = new Cookies();
  
  const [logged, setLogged] = useState('');
  useEffect(()=>{
    setLogged(getCookie.get('USER-NAME'))
  })


  return (
    <>
      {!logged ? (
        <>
          <Login setLogged={setLogged} />
        </>
      ) : (
        <div>
          <Router>
            <SideBar logged={logged} setLogged={setLogged} />
            <Routes>
              <Route path="/" element={<Posts  logged={logged} />} />
              <Route path="/AddPost" element={<AddPost logged={logged} />} />
              <Route path="/MyProfile" element={<MyProfile logged={logged}/>}/>
              <Route path="/SuggestionList" element={<SuggestList  logged={logged} />} />
              <Route path="/singleView/:id" element={<SingleProfile/>}/>
              <Route path="/FriendsOnMob" element={<FriendsOnMob logged={logged}/>} />
              <Route path="/SugOnMob" element={<SugOnMob logged={logged}/>}/>
              <Route path="/Settings" element={<Settings logged={logged} setLogged={setLogged}/>}/>
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
