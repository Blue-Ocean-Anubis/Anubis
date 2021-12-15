import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";

const Cart = () => {

  const [list, getList] = useState();
  const { user } = useContext(AuthContext);
  console.log('user: ', user);
  axios.get('/cart', {
    uid: user.uid
  })
    .then(list => {
      getList(list);
    })
    .catch(err => {
      console.log('Error retrieving user list: ', err);
    })

  return (
    <div className="page">
      <Nav />
      <h1> DUDE WHERE'S MY CART </h1>
    </div>
  );
};

export default Cart;
