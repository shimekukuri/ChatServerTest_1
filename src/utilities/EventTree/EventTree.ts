import { EventBranch } from './EventBranch.js';
import { EventLeaf } from './EventLeaf.js';

interface Trunks {
  [key: string]: EventBranch;
}

export type Conditions = (val: string) => boolean;

interface AsyncronousRetryStack {
  [key: string]: {
    iteration: number;
    conditionStack: Conditions;
  };
}

export class EventTree {
  private trunks: Trunks;
  private traversalStack: (EventBranch | EventLeaf)[];
  private asyncRetryStack: AsyncronousRetryStack;

  constructor() {
    this.trunks = {};
    this.traversalStack = [];
    this.asyncRetryStack = {};
  }

  asyncRetryHandler = (() => {
    return new Promise(() => {});
  })();

  addTrunk = (
    key: string,
    val: string,
    image?: string,
    args?: Conditions[]
  ) => {
    if (!this.trunks[key]) {
      this.trunks[key] = new EventBranch(key, val, image, {
        val: 'test',
      });
      this.trunks[key].addBranch([...args]);
      return true;
    } else {
      return false;
    }
  };

  removeTrunk = (key: string) => {
    if (this.trunks[key]) {
      delete this.trunks[key];
      return true;
    } else {
      return false;
    }
  };

  traverse = (condition: Conditions[]) => {
    let initCondition = condition.shift();
    if (initCondition === undefined) {
      return;
    }
    for (let k in this.trunks) {
      if (initCondition(this.trunks[k].val)) {
        this.trunks[k];
        this.traversalStack.push(this.trunks[k]);
      }

      let visited = new Set();

      while (this.traversalStack.length > 0) {
        let loopConditions = condition.shift();
        if (loopConditions === undefined) {
          return;
        }
        let tempStack: (EventBranch | EventLeaf)[] = [];

        for (let i = 0; i < this.traversalStack.length; i++) {
          if (this.traversalStack[i] instanceof EventLeaf) {
            //@ts-expect-error
            this.traversalStack[i].sendEvent();
          } else {
            if (visited.has(this.traversalStack[i])) {
              continue;
            }

            if (loopConditions(this.traversalStack[i].val)) {
              //@ts-expect-error
              for (let j = 0; j < this.traversalStack[i].branches.length; j++) {
                //@ts-expect-error
                tempStack.push(this.traversalStack[i].branches[j]);
              }
            }
          }
        }

        this.traversalStack = [...tempStack];
      }
    }
  };
}
