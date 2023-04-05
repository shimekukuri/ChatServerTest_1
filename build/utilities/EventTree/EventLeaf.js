export class EventLeaf {
    clients;
    val;
    constructor(val) {
        this.clients = [];
        this.val = val;
    }
    addClient = (ws) => {
        this.clients.push(ws);
    };
    removeClient = (ws) => {
        this.clients.filter((x) => x === ws);
    };
    sendEvent = () => {
        for (let i = 0; i < this.clients.length; i++) {
            this.clients[i].eventMatch(this.val);
        }
    };
}
