import React, { Component } from "react";
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree";

import WishListItemEdit from "./WishListItemEdit"
import "./WishListItemView.css";

class WishListItemView extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            clone: null,
        };
    }

    render() {
        const { item } = this.props;
        return this.state.isEditing
            ? (this.renderEditable())
            : (
                <li className="item">
                    {item.image && <img src={item.image} alt="" />}
                    <h3>{item.name}</h3>
                    <span>${item.price}</span>
                    <button
                        onClick={this.onToggleEdit}>
                        Edit
                    </button>
                </li>
            );
    }

    renderEditable() {
        const item = this.state.clone;
        return (
            <li className="item">
                <WishListItemEdit item={item} />
                <button
                    onClick={this.onSaveEdit}>
                    Save
                    </button>
                <button
                    onClick={this.onCancelEdit}>
                    Cancel
                    </button>
            </li>
        );
    }

    onToggleEdit = () => {
        this.setState({
            isEditing: true,
            clone: clone(this.props.item),
        })
    }

    onSaveEdit = () => {
        applySnapshot(
            this.props.item,
            getSnapshot(this.state.clone)
        );
        this.setState({
            isEditing: false,
            clone: null,
        })
    }

    onCancelEdit = () => {
        this.setState({
            isEditing: false,
            clone: null,
        })
    }
}

export default WishListItemView;
