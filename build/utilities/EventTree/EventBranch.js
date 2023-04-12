export class EventBranch {
    val;
    name;
    image;
    data;
    branches;
    constructor(val, name, image, data) {
        this.val = val;
        this.name = name ? name : '';
        this.image = image ? image : '';
        this.data = data ? data : {};
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
    addBranch = (conditions) => { };
    addLeaf = () => { };
}
const meep = new EventBranch('test', 'test', 'test', { val: 'test' });
console.log(meep.val);
