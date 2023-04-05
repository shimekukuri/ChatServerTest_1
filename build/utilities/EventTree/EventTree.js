import { EventBranch } from './EventBranch.js';
import { EventLeaf } from './EventLeaf.js';
export class EventTree {
    trunks;
    traversalStack;
    constructor() {
        this.trunks = {};
        this.traversalStack = [];
    }
    addTrunk = (key) => {
        if (!this.trunks[key]) {
            this.trunks[key] = new EventBranch(key);
            return 1;
        }
        else {
            return 0;
        }
    };
    removeTrunk = (key) => {
        if (this.trunks[key]) {
            delete this.trunks[key];
            return 1;
        }
        else {
            return 0;
        }
    };
    traverse = (condition) => {
        for (let k in this.trunks) {
            if (condition(this.trunks[k].val)) {
                this.trunks[k];
                this.traversalStack.push(this.trunks[k]);
            }
            let visited = new Set();
            while (this.traversalStack.length > 0) {
                let tempStack = [];
                for (let i = 0; i < this.traversalStack.length; i++) {
                    if (this.traversalStack[i] instanceof EventLeaf) {
                        //@ts-expect-error
                        this.traversalStack[i].sendEvent();
                    }
                    else {
                    }
                }
            }
        }
    };
}
