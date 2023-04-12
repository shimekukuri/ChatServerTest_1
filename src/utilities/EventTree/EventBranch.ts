import { Conditions } from './EventTree.js';

export class EventBranch {
  val: string;
  name?: string;
  image?: string;
  data: {};
  private branches: EventBranch[] | [];

  constructor(val: string, name?: string, image?: string, data?: {}) {
    this.val = val;
    this.name = name ? name : '';
    this.image = image ? image : '';
    this.data = data ? data : {};
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

  addBranch = (conditions: Conditions[]) => {};

  addLeaf = () => {};
}

const meep = new EventBranch('test', 'test', 'test', { val: 'test' });

console.log(meep.val);
