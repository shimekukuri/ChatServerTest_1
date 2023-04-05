import { EventBranch } from './EventBranch.js';
import { EventLeaf } from './EventLeaf.js';

interface Trunks {
  [key: string]: EventBranch;
}

export class EventTree {
  private trunks: Trunks;
  private traversalStack: (EventBranch | EventLeaf)[];

  constructor() {
    this.trunks = {};
    this.traversalStack = [];
  }

  addTrunk = (key: string) => {
    if (!this.trunks[key]) {
      this.trunks[key] = new EventBranch(key);
      return 1;
    } else {
      return 0;
    }
  };

  removeTrunk = (key: string) => {
    if (this.trunks[key]) {
      delete this.trunks[key];
      return 1;
    } else {
      return 0;
    }
  };

  traverse = (condition: (val: string) => boolean) => {
    for (let k in this.trunks) {
      if (condition(this.trunks[k].val)) {
        this.trunks[k];
        this.traversalStack.push(this.trunks[k]);
      }

      let visited = new Set();

      while (this.traversalStack.length > 0) {
        let tempStack: (EventBranch | EventLeaf)[] = [];

        for (let i = 0; i < this.traversalStack.length; i++) {
          if (this.traversalStack[i] instanceof EventLeaf) {
            //@ts-expect-error
            this.traversalStack[i].sendEvent();
          } else {
            if(visited.has(this.traversalStack[i])) {
              return 
            }

            if(condition(this.traversalStack[i].val))
          }
        }
      }
    }
  };
}
