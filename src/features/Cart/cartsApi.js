import axios from "axios";
export function fetchingCart() {
  return axios.get('http://localhost:8080/myCart')
}
export function addToCart(item) {
  return axios.post('http://localhost:8080/myCart',item)
}
export function deleteFromCart(item) {
  return axios.delete(`http://localhost:8080/myCart/${item}`)
}
export function updateInCart(id,change) {
  return axios.patch(`http://localhost:8080/myCart/${id}`,change)
}
