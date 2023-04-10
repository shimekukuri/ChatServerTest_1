export class EventLeaf {
    clients;
    val;
    name;
    image;
    data;
    constructor(val, name, image, data) {
        this.clients = [];
        this.val = val;
        this.name = name ? name : '';
        this.image = image ? image : '';
        this.data = data ? data : {};
    }
    addClient = (ws) => {
        this.clients.push(ws);
    };
    removeClient = (ws) => {
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
