import axios from "axios";
export function fetchingPosts() {
  return axios.get('http://localhost:8080/posts')
}
export function updateLikePosts(id,like) {
  return axios.patch(`http://localhost:8080/posts/${id}`,like)
}
export function addPost(post) {
  return axios.post(`http://localhost:8080/posts`,post)
}
export function addUserInLike(id,user) {
  return axios.patch(`http://localhost:8080/posts/${id}`,user)
}
export function postDelete(id){
  return axios.delete(`http://localhost:8080/posts/${id}`)
}