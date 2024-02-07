import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncPosts } from '../Posts/postsSlice'

import {addAsyncFriend, fetchAsyncUsers } from './../Accounts/AccountsSlice';
import '../SugOnMob/SugOnMob.css'
import { Link } from 'react-router-dom';

export default function FriendsOnMob(props) {
  const {logged}=props
  const [myFrinds,setmyFriends]=useState([])
  const dispatch=useDispatch()
  const AllUsers=useSelector((state)=>state.user.Users)
  const AllPosts=useSelector((state)=>state.posted.postGlobe)
  useEffect(()=>{
      dispatch(fetchAsyncPosts())
  },[dispatch])
  const myProfiles=AllPosts.filter((myposts)=>myposts.userName===logged).map((myposts)=>myposts)
  //gfhgkjhgj
  const [suggestionForUser, setList] = useState([]);

  const SuggestionList = useSelector((state) => state.user.Users);

  useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);

  useEffect(() => {
    const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
    const PureSuggestList = SuggestionList.filter((otherUser) => otherUser.userName !== logged);
    setmyFriends(aboutMe[0]?.friends)
  
    // Ensure aboutMe is not empty before accessing properties
    const purifiedFinalList =
      aboutMe.length > 0
        ? PureSuggestList.filter((user) => !aboutMe[0]?.friends?.includes(user.userName))
        : [];

    setList(purifiedFinalList);
 
  }, [SuggestionList, logged]);

  const unfollowUser = (userName) => {
    // Ensure aboutMe is not empty before dispatching the action
    const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
    const unfriend=aboutMe[0].friends.filter((frind)=>frind!==userName)

    console.log(unfriend)
    if (aboutMe.length > 0) {
      dispatch(
        addAsyncFriend({
          id: aboutMe[0].id,
          user: { friends: unfriend},
        })
      );
    }
  };
  const usersInMyFriends = AllUsers.filter((user) => myFrinds.includes(user.userName));
  return (
    
          <div className='Container_Mob' style={{color:"white",backgroundColor:"black"}}>
          <div  >
        <h3 className="mb-5 ">Friend List</h3>
        {myFrinds.length >0 ? <h4 className='text-light'>Your Total {myFrinds.length>1?<span>Friends are</span>:<span> Friend is</span> } : {myFrinds.length} </h4>: <><h4>You don't have Friends yet</h4></>}
        { usersInMyFriends?.map((User) => (
          <div key={User.userName}>
            <p style={{ fontSize: '25px' }}>
            <img className='circle p-2' src={`${User.ProfilePic}`} alt="profile pic" height={"50px"} width={"50px"} style={{ borderRadius: '50%' }} />
              <Link to={`/singleView/${User.id}`}>{User.userName}</Link>
              <button className="follow_b" onClick={() => unfollowUser(User)}>
                UnFriend -
              </button>
            </p>
          </div>
        ))} 
      </div>
          </div>
         
  )
}
