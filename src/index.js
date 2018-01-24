import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { WishList } from "./models/WishList";

const wishList = WishList.create({
    items: [{
        name: "Machine Gun Preacher",
        price: 7.35,
        image: "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SL1500_.jpg",
    }, {
        name: "LEGO Mindstorm EV3",
        price: 349.95,
        image: "https://images-na.ssl-images-amazon.com/images/I/81XHPRseuVL._SL1000_.jpg",
    }]
});

ReactDOM.render(
    <App wishList={wishList} />,
    document.getElementById('root')
);

setInterval(
    () => {
        wishList.items[0].changePrice(wishList.items[0].price + 1);
        console.log("le change");
    },
    1000
)
