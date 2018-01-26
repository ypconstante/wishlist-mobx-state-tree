import React from "react";
import { observer } from "mobx-react";

import WishListItemView from "./WishListItemView";
import WishListItemEntry from "./WishListItemEntry";
import "./WishListView.css";

const WishListView = ({ wishList, readonly }) => (
    <div className="list">
        <ul>
            {wishList.items.map((item, index) =>
                (<WishListItemView key={index} item={item} readonly={readonly} />)
            )}
            Total: ${wishList.totalPrice}

            {
                !readonly &&
                <WishListItemEntry wishList={wishList} />
            }
        </ul>
    </div>
);

export default observer(WishListView);
