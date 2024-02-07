import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAsyncPosts } from "../Posts/postsSlice";
import { fetchAsyncUsers } from "../Accounts/AccountsSlice";

export default function SingleProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncPosts());
    dispatch(fetchAsyncUsers());
  }, [dispatch]);
  const { id } = useParams();
  const GlobalPosts = useSelector((state) => state.posted.postGlobe);
  const Users = useSelector((state) => state.user.Users);
  const findCurrentUser = Users.filter((user) => user.id === Number(id));
  const thisUser = findCurrentUser[0];
  const User_Post = GlobalPosts.filter((posts) =>
    posts.userName?.includes(thisUser.userName)
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row" >
          <b style={{ textAlign: "center" }}>{thisUser?.userName}</b>
          <p style={{ textAlign: "center" }}>
            Total Friends: {thisUser?.friends?.length}
          </p>
          {User_Post.length>0 ? User_Post.map((post) => {
            return (
              <div className="col-sm-7 mt-1 mb-1">
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
                  <p>posted at 5:49</p>
                </div>
                <span className="mt-1 mb-1 p-2 s_b">
                  like: {post.reactions}
                </span>
                
                <button className="mt-2 mb-1  s_b"> Comments</button>
              </div>
            );
          }):<div style={{textAlign:"center"}}>No Posts Yet</div>}
        </div>
      </div>
    </>
  );
}
