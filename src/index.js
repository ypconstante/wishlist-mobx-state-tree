import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot } from "mobx-state-tree";

import './assets/index.css';
import App from './components/App';
import { Group } from "./models/Group";

const initialState = getInitialState();
let group = Group.create(initialState);

renderApp();

if (module.hot) {
    module.hot.accept(
        ["./components/App"],
        () => renderApp()
    );

    module.hot.accept(
        [
            "./models/Group",
            "./models/WishList",
        ],
        () => {
            const snapshot = getSnapshot(group);
            group = Group.create(snapshot);
            renderApp();
        }
    );
}

function getInitialState() {
    return {
        users: {
            "a342": {
                id: "a342",
                name: "Homer",
                gender: "m",
            },
            "5fc2": {
                id: "5fc2",
                name: "Marge",
                gender: "f",
            }
        },
    };
}

function renderApp() {
    ReactDOM.render(
        <App group={group} />,
        document.getElementById('root')
    );
}
