import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  return (
    <div className="cart">
      {/* Cart Items */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{quantity}</p>
                  <p>${item.price * quantity}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Bottom */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${totalAmount}</b>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        {/* Promo Code */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;