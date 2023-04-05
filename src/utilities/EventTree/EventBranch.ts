import { leafValue } from './EventLeaf.js';

export class EventBranch {
  public val: leafValue;
  private branches: EventBranch[] | [];

  constructor(val: leafValue) {
    this.val = val;
    this.branches = [];
  }

  bfs = (condition: Function) => {
    let arr: EventBranch[] = [];
    for (let i = 0; i < this.branches.length; i++) {
      if (condition(this.val)) {
        arr.push(this.branches[i]);
      }
    }

    return arr;
  };

  addBranch = () => {};

  addLeaf = () => {};
}

const meep = new EventBranch({ name: 'test', image: '', data: {} });

console.log(meep.val);
