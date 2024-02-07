import React, { useEffect} from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAsync, deleteAsync, fetchAsyncCart } from "./cartSlice";

export function Carts() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>state.cart.Carts);
  useEffect(()=>{
    dispatch(fetchAsyncCart())
    
  },[dispatch])
  const handleChange=(e,id)=>{
    dispatch(UpdateAsync({id,change:{quantity:e.target.value}}))
    
  }
 
  return (
    <>
      {cartItem.map((item)=>{
        return  <div className="cart-item">
        <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
        <div className="cart-item-details">
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-price">${item.price*item.quantity}</p>
          <select value={item.quantity} onChange={(e)=>handleChange(e,item.id)}>
          <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <p>items:{item.quantity}</p>
          <button onClick={()=>dispatch(deleteAsync(item.id))}>x</button>
        </div>
      </div>;

      })}
      <h1>Total: {cartItem.reduce((acc,item)=> item.price*item.quantity+acc,0)}</h1>
    </>
  );
}
