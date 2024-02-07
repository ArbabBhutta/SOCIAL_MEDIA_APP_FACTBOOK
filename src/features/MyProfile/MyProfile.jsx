import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAsyncPost, fetchAsyncPosts } from '../Posts/postsSlice'
import '../SuggestionList/Sugest.css'

import { addAsyncFriend,fetchAsyncUsers } from './../Accounts/AccountsSlice';
import { Link } from 'react-router-dom';

export default function MyProfile(props) {
    const {logged}=props
    const [myFrinds,setmyFriends]=useState([])
    const dispatch=useDispatch()
    const AllPosts=useSelector((state)=>state.posted.postGlobe)
    const AllUsers=useSelector((state)=>state.user.Users)
    useEffect(()=>{
        dispatch(fetchAsyncPosts())
    },[dispatch])
    const myProfiles=AllPosts.filter((myposts)=>myposts.userName===logged).map((myposts)=>myposts)
    //gfhgkjhgj
    const [suggestionForUser, setList] = useState([]);

    const SuggestionList = useSelector((state) => state.user.Users);
    const usersInMyFriends = AllUsers.filter((user) => myFrinds?.includes(user.userName));
  
    useEffect(() => {
      dispatch(fetchAsyncUsers());
    }, [dispatch]);
  
    useEffect(() => {
      const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
      const PureSuggestList = SuggestionList.filter((otherUser) => otherUser.userName !== logged);
      setmyFriends(aboutMe[0]?.friends)
    
      // Ensure aboutMe is not empty before accessing properties
      const purifiedFinalList =
        aboutMe?.length > 0
          ? PureSuggestList.filter((user) => !aboutMe[0]?.friends?.includes(user.userName))
          : [];
  
      setList(purifiedFinalList);
   
    }, [SuggestionList, logged]);
  
    const unfollowUser = (userName) => {
      // Ensure aboutMe is not empty before dispatching the action
      const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
      const unfriend=aboutMe[0].friends.filter((frind)=>frind!==userName.userName)
      
      console.log(unfriend)
      if (aboutMe?.length > 0) {
        dispatch(
          addAsyncFriend({
            id: aboutMe[0].id,
            user: { friends: unfriend},
          })
        );
      }
    };

    const DeltePost=(id)=>{
     dispatch( deleteAsyncPost(id))

    }
  return (
    
       <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-4'>

          <div className="suggest">
            
        <h3 className="mt-5" style={{padding:'10px'}}>Friend List</h3>
        {myFrinds?.length >0 ? <h4 className='text-light p-2'>Your Total {myFrinds?.length>1?<span>Friends are</span>:<span> Friend is</span> } : {myFrinds?.length} </h4>: <><h4>You don't have Friends yet</h4></>}

        <div className='sugest_list' style={{padding:'10px'}}>
        { usersInMyFriends?.map((User) => (

          <div key={User} >
            <p style={{ fontSize: '25px' }}>
            <img className='circle p-2' src={`${User.ProfilePic}`} alt="profile pic" height={"50px"} width={"50px"} style={{ borderRadius: '50%' }} />
              <Link to={`/singleView/${User.id}`} ><span>{User.userName}</span></Link>
              
              <button className="follow_b" onClick={() => unfollowUser(User)}>
                UnFriend -
              </button>
            </p>
          </div>
        ))} 
        </div>
      </div>
          </div>
          <div className='col-sm-6 mt-1 mb-1'>
          {myProfiles.length > 0? myProfiles.map((post)=>{
            return <div>
                
                
                
                <div className="post_container mb-3">
            <span><cite>Publisher </cite>: <b>You</b></span>
            <p className="post_title">{post.title}</p>
            <p>{post.body}</p>
            <img className="img" src={post.image} width={"100%"} alt={post.title} />
            <p>posted at {post.postedDate.hour}:{post.postedDate.minute} on "{post.postedDate.month} {post.postedDate.date} {post.postedDate.year}"</p>

          </div>
          <span className="mt-2 mb-1 p-2 s_b" >liked : {post.reactions}</span>
          <button className='btn btn-danger' onClick={()=>DeltePost(post.id)}>Delete Post</button>
          <h6 className='mt-3'>All Comments on This Post will shown Down Here</h6>
          {post.comments.map((comnt)=>{
            return(
              <div className='mt-2'>
                <h5><i>{comnt.cmntBy}</i></h5>
                <p className=''>"{comnt.inComent}"</p>
              </div>
            )
          })}
                </div>
              
            
        })
        
        :<div style={{textAlign:"center"}}>You Have not Posted anything Yet!</div>}
          </div>
        
        </div>
       </div>
    
  )
}
