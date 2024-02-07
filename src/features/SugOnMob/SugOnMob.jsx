
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addAsyncFriend, fetchAsyncUsers } from './../Accounts/AccountsSlice';
import './SugOnMob.css'

export default function SugOnMob(props) {
    const dispatch = useDispatch();
  const { logged } = props;
  const [suggestionForUser, setList] = useState([]);

  const SuggestionList = useSelector((state) => state.user.Users);

  useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);

  useEffect(() => {
    const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
    const PureSuggestList = SuggestionList.filter((otherUser) => otherUser.userName !== logged);

    // Ensure aboutMe is not empty before accessing properties
    const purifiedFinalList =
      aboutMe.length > 0
        ? PureSuggestList.filter((user) => !aboutMe[0]?.friends?.includes(user.userName))
        : [];

    setList(purifiedFinalList);
 
  }, [SuggestionList, logged]);

  const followUser = (userName) => {
    // Ensure aboutMe is not empty before dispatching the action
    const aboutMe = SuggestionList.filter((myFriend) => myFriend.userName === logged);
    if (aboutMe.length > 0) {
      dispatch(
        addAsyncFriend({
          id: aboutMe[0].id,
          user: { friends: [...aboutMe[0]?.friends, userName] },
        })
      );
    }
  };
  
  return (
    <>
      <div className='Container_Mob'>
        <h1 className='mb-5 text-light'>Suggestion List For You</h1>
        <div >
      <div className="sugest_list">
        
        
        { suggestionForUser.map((User) => (
          <div key={User.userName}>
            <p style={{ fontSize: '25px' }}>
            <img className='circle p-2' src={`${User.ProfilePic}`} alt="profile pic" height={"50px"} width={"50px"} style={{ borderRadius: '50%' }} />
              <Link  to={`/singleView/${User.id}`}><b>{User.userName}</b></Link>
              <button className="follow_b" onClick={() => followUser(User.userName)}>
                Follow +
              </button>
            </p>
          </div>
        ))} 
      </div>
    </div>
      </div>
    </>
  );
}
