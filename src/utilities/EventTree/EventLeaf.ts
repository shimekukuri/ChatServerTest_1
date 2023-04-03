import { ClientSocket } from '../ClientSocket.js';

export class EventLeaf {
  clients: ClientSocket[];
  value: {};

  constructor(value: {}) {
    this.clients = [];
    this.value = {};
  }

  addClient = (ws: ClientSocket) => {
    this.clients.push(ws);
  };

  removeClient = (ws: ClientSocket) => {
    this.clients.filter((x) => x === ws);
  };

  sendEvent = () => {
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].eventMatch(this.value);
    }
  };
}
