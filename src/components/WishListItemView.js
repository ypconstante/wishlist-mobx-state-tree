import React from "react";

import "./WishListItemView.css";

const WishListItemView = ({ item }) => (
    <li className="item">
        {item.image && <img src={item.image} alt="" />}
        <h3>{item.name}</h3>
        <span>${item.price}</span>
    </li>
);

export default WishListItemView;
