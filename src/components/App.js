import React, { Component } from 'react';
import logo from './../assets/logo.svg';
import './App.css';

import WishListView from "./WishListView"

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
                <select onChange={this.onSelectUser}>
                    <option>- Select user -</option>
                    {group.users.values().map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                {
                    selectedUser
                    && <WishListView wishList={selectedUser.wishList} />
                }
                {
                    selectedUser
                    && <button onClick={selectedUser.addSuggestions}>Add suggestions</button>
                }
            </div>
        );
    }

    onSelectUser = (event) => {
        this.setState({
            selecteduser: event.target.value,
        })
    }
}

export default App;
