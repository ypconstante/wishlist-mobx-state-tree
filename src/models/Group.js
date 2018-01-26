import { types, flow, applySnapshot } from "mobx-state-tree";

import { WishList } from "./WishList";

export const User = types
    .model({
        id: types.identifier(),
        name: types.string,
        gender: types.enumeration("gender", ["m", "f"]),
        wishList: types.optional(WishList, {}),
        recipient: types.maybe(types.reference(types.late(() => User))),
    })
    .actions(self => ({
        addSuggestions: flow(function* () {
            const response = yield fetch(`http://localhost:3001/suggestions_${self.gender}`);
            const suggestions = yield response.json();
            self.wishList.items.push(...suggestions);
        }),
    }));

export const Group = types
    .model({
        users: types.map(User),
    })
    .actions(self => ({
        afterCreate() {
            self.load();
        },
        load: flow(function* () {
            const response = yield fetch(`http://localhost:3001/users`);
            const users = yield response.json();
            applySnapshot(self.users, users);
        }),
        drawLots() {
            const allUsers = self.users.values();

            if (allUsers.length <= 1)
                return;

            const remaining = [...allUsers];

            allUsers.forEach((user) => {
                user.recipient = null;
                if (remaining.length === 1 && remaining[0] === user) {
                    // last user on the list and only remaining
                    const indexSwapWith = Math.floor(Math.random() * (allUsers.length - 1));
                    const swapWith = allUsers[indexSwapWith];
                    user.recipient = swapWith.recipient;
                    swapWith.recipient = user;
                } else {
                    while (user.recipient == null) {
                        const indexRecipient = Math.floor(Math.random() * remaining.length);
                        const recipient = remaining[indexRecipient];

                        if (recipient !== user) {
                            user.recipient = recipient;
                            remaining.splice(indexRecipient, 1);
                        }
                    }
                }
            })
        }
    }));
