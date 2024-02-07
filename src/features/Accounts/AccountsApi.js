import axios from "axios";
export function fetchingUsers() {
  return axios.get('http://localhost:8080/accounts')
}
export function addUser(user) {
  return axios.post(`http://localhost:8080/accounts`,user)
}
export function addUsersFriends(id,user) {
  return axios.patch(`http://localhost:8080/accounts/${id}`,user)
}