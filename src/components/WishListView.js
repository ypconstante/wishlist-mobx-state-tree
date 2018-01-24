import React from "react";
import { observer } from "mobx-react";

import WishListItemView from "./WishListItemView"
import "./WishListView.css";

const WishListView = ({ wishList }) => (
    <div className="list">
        <ul>
            {wishList.items.map((item, index) =>
                (<WishListItemView key={index} item={item} />)
            )}
            Total: ${wishList.totalPrice}
        </ul>
    </div>
);

export default observer(WishListView);
