import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot } from "mobx-state-tree";

import './assets/index.css';
import App from './components/App';
import { WishList } from "./models/WishList";

const initialState = getInitialState();
let wishList = WishList.create(initialState);

renderApp();

if (module.hot) {
    module.hot.accept(
        ["./components/App"],
        () => renderApp()
    );

    module.hot.accept(
        ["./models/WishList"],
        () => {
            const snapshot = getSnapshot(wishList);
            wishList = WishList.create(snapshot);
            renderApp();
        }
    );
}

function getInitialState() {
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

function renderApp() {
    ReactDOM.render(
        <App wishList={wishList} />,
        document.getElementById('root')
    );
}
