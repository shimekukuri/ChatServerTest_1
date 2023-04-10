import { ClientSocket } from '../ClientSockt/ClientSocket.js';

export class EventLeaf {
  clients: ClientSocket[];
  val: string;
  name?: string;
  image?: string;
  data: {};

  constructor(val: string, name?: string, image?: string, data?: {}) {
    this.clients = [];
    this.val = val;
    this.name = name ? name : '';
    this.image = image ? image : '';
    this.data = data ? data : {};
  }

  addClient = (ws: ClientSocket) => {
    this.clients.push(ws);
  };

  removeClient = (ws: ClientSocket) => {
    this.clients.filter((x) => x === ws);
  };

  sendEvent = () => {
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].eventMatch({
        val: this.val,
        name: this.name,
        image: this.image,
        data: this.data,
      });
    }
  };
}
