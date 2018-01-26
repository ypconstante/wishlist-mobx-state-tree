import React, { Component } from 'react';
import logo from './../assets/logo.svg';
import './App.css';

import WishListView from "./WishListView"
import { observer } from 'mobx-react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            selecteduser: null,
        }
    }

    render() {
        const { group } = this.props;
        const selectedUser = group.users.get(this.state.selecteduser);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">WishList</h1>
                </header>
                <button onClick={group.reload}>
                    Reload
                </button>
                <select onChange={this.onSelectUser}>
                    <option>- Select user -</option>
                    {group.users.values().map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button onClick={group.drawLots}>
                    Draw lots
                </button>
                {selectedUser && <User user={selectedUser} />}
            </div>
        );
    }

    onSelectUser = (event) => {
        this.setState({
            selecteduser: event.target.value,
        })
    }
}

const User = observer(({ user }) => (
    <div>
        <WishListView wishList={user.wishList} />
        <button onClick={user.addSuggestions}>
            Add suggestions
        </button>

        {user.recipient && (
            <div>
                <hr />
                <h2>{user.recipient.name}</h2>
                <WishListView wishList={user.recipient.wishList} readonly />
            </div>
        )}
    </div>
));

export default observer(App);
