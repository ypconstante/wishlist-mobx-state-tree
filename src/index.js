import React from 'react';
import ReactDOM from 'react-dom';
import { onSnapshot } from "mobx-state-tree";

import './assets/index.css';
import App from './components/App';
import { WishList } from "./models/WishList";

const initialState = getInitialState();
const wishList = WishList.create(initialState);

onSnapshot(
    wishList,
    (snapshot) => {
        localStorage.setItem("wishListApp", JSON.stringify(snapshot));
    }
)

ReactDOM.render(
    <App wishList={wishList} />,
    document.getElementById('root')
);

function getInitialState() {
    const json = localStorage.getItem("wishListApp");
    if (json != null) {
        const data = JSON.parse(json);
        if (WishList.is(data)) {
            return data;
        }
    }
    return {
        items: [{
            name: "Machine Gun Preacher",
            price: 7.35,
            image: "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SL1500_.jpg",
        }, {
            name: "LEGO Mindstorm EV3",
            price: 349.95,
            image: "https://images-na.ssl-images-amazon.com/images/I/81XHPRseuVL._SL1000_.jpg",
        }]
    }
}
