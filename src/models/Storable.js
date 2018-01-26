import { flow, getSnapshot, onSnapshot, types } from "mobx-state-tree";

export function createStorable(collection, attribute) {
    return types
        .model({})
        .actions(self => ({
            afterCreate() {
                onSnapshot(self, self.save);
            },
            save: flow(function* () {
                try {
                    yield fetch(`http://localhost:3001/${collection}/${self[attribute]}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(getSnapshot(self)),
                    });
                } catch (e) {
                    console.error("error to save data", self, e);
                }
            }),
        }))
}
