export class EventLeaf {
    clients;
    value;
    constructor(value) {
        this.clients = [];
        this.value = {};
    }
    addClient = (ws) => {
        this.clients.push(ws);
    };
    removeClient = (ws) => {
        this.clients.filter((x) => x === ws);
    };
    sendEvent = () => {
        for (let i = 0; i < this.clients.length; i++) {
            this.clients[i].eventMatch(this.value);
        }
    };
}
