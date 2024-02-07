import React, { useEffect, useState } from "react";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAsyncComments,
  fetchAsyncPosts,
  updateAsyncAccounts_likes,
  updateAsyncPosts,
} from "./postsSlice";
import { fetchAsyncUsers } from "../Accounts/AccountsSlice";
import SuggestList from "../SuggestionList/SuggestList";

export function Posts(props) {
  //maybee
  const [commentInputs, setCommentInputs] = useState({});

  const { logged } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncPosts());
    dispatch(fetchAsyncUsers());
  }, [dispatch]);

  const GlobalPosts = useSelector((state) => state.posted.postGlobe);

  const AddLike = (id, reactions, liked_by, logged) => {
    const isLiked = liked_by.includes(logged);

    if (isLiked) {
      const afterDislike = liked_by.filter((userCut) => userCut !== logged);
      dispatch(updateAsyncPosts({ id, like: { reactions: reactions - 1 } }));
      dispatch(
        updateAsyncAccounts_likes({ id, user: { liked_by: afterDislike } })
      );
    } else {
      dispatch(updateAsyncPosts({ id, like: { reactions: reactions + 1 } }));
      dispatch(
        updateAsyncAccounts_likes({
          id,
          user: { liked_by: [...liked_by, logged] },
        })
      );
    }
  };
  const handleComnt = (cmntPerson, id, comments) => {
    if (!commentInputs[id] || commentInputs[id].length === 0) return;
    
    const newComnt = {
      cmntBy: cmntPerson,
      inComent: commentInputs[id],
    };

    dispatch(
      AddAsyncComments({
        id,
        comnt: { comments: [...comments, newComnt] },
      })
    );

    // Clear the input field for the specific post
    setCommentInputs({ ...commentInputs, [id]: '' });
  };
  const [visibleComments, setVisibleComments] = useState({});
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 suggest">
            <div className="sugest_list">
              <SuggestList logged={logged} />
            </div>
          </div>

          <div className="col-sm-6 mt-1 mb-1">
            <div className="forRepeat">
              {GlobalPosts.map((post) => {
                const isCommentsVisible = visibleComments[post.id];
                return (
                  <>
                    <div className="post_container">
                      <span>
                        <cite>Publisher </cite>: <b>{post.userName}</b>
                      </span>
                      <p className="post_title">{post.title}</p>
                      <p>{post.body}</p>
                      <img
                        className="img"
                        src={post.image}
                        width={"100%"}
                        alt={post.title}
                      />
                      <p>
                        posted at {post.postedDate.hour}:
                        {post.postedDate.minute} on "{post.postedDate.month}{" "}
                        {post.postedDate.date} {post.postedDate.year}"
                      </p>
                    </div>
                    <button
                      className="mt-1 mb-1 p-2 s_b"
                      onClick={() =>
                        AddLike(post.id, post.reactions, post.liked_by, logged)
                      }
                    >
                      <span
  className="material-icons"
  style={{ color: post.liked_by.includes(logged) ? "white" : "#073289" }}
>
  favorite
</span>
                    </button>{" "}
                    
                    <button
              className=" mt-1 mb-1 p-2 s_b"
              style={{ width: "100px", textAlign: "center",height:"50px" }}
              onClick={() =>
                setVisibleComments({
                  ...visibleComments,
                  [post.id]: !isCommentsVisible,
                })
              }
            >
              {!isCommentsVisible ? (
                <>
                  <span className="material-icons mt-1" >comment</span>
                 
                </>
              ) : (
                <span className="material-icons" >speaker_notes_off</span>
              )}
            </button>
                    <br />
                    <span>Liked by {post.reactions} {post.liked_by.includes(logged) && <span>You Liked it</span>}</span>
                    {isCommentsVisible
              ? post.comments.map((com) => {
                  return (
                    <div>
                      <b>{com.cmntBy}</b>
                      <p>'{com.inComent}'</p>
                    </div>
                  );
                })
              : null}
            <br />
                    <input
              className="cmntInput"
              value={commentInputs[post.id] || ''}
              placeholder="Write here..."
              onChange={(e) =>
                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
              }
            />
            <button
              className="send"
              onClick={() => handleComnt(logged, post.id, post.comments)}
            >
              Send
            </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
