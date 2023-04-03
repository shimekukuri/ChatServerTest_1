export interface leafVal {
  [key: string]: string;
}

export class EventLeaf {
  public val: leafVal;

  constructor(val: leafVal) {
    this.val = val;
  }
}

const meep = new EventLeaf({ lol: 'lol' });

console.log(meep.val);
