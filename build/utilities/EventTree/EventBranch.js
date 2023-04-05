export class EventBranch {
    val;
    branches;
    constructor(val) {
        this.val = val;
        this.branches = [];
    }
    bfs = (condition) => {
        let arr = [];
        for (let i = 0; i < this.branches.length; i++) {
            if (condition(this.val)) {
                arr.push(this.branches[i]);
            }
        }
        return arr;
    };
    addBranch = () => { };
    addLeaf = () => { };
}
const meep = new EventBranch({ name: 'test', image: '', data: {} });
console.log(meep.val);
