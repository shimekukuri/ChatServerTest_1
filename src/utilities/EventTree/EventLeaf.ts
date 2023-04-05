import { ClientSocket } from '../ClientSocket.js';

export interface leafValue {
  name: string;
  image?: string;
  data: {};
}

export class EventLeaf {
  clients: ClientSocket[];
  val: leafValue;

  constructor(val: leafValue) {
    this.clients = [];
    this.val = val;
  }

  addClient = (ws: ClientSocket) => {
    this.clients.push(ws);
  };

  removeClient = (ws: ClientSocket) => {
    this.clients.filter((x) => x === ws);
  };

  sendEvent = () => {
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].eventMatch(this.val);
    }
  };
}
