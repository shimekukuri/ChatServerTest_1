export class EventLeaf {
    val;
    constructor(val) {
        this.val = val;
    }
}
const meep = new EventLeaf({ lol: 'lol' });
console.log(meep.val);
