class ClientMap {
    static instance;
    map;
    constructor() {
        this.map = new Map();
    }
    static getInstance = () => {
        if (!ClientMap.instance) {
            this.instance = new ClientMap();
            return ClientMap.instance;
        }
        else {
            return ClientMap.instance;
        }
    };
    addClient = (userId, ws) => {
        if (this.map?.has(userId)) {
            return new Error('User Already Exists');
        }
        this.map?.set(userId, ws);
        setTimeout(() => { });
        return true;
    };
    removeClient = (userId) => {
        if (!this.map?.has(userId)) {
            return new Error('User does not exist');
        }
        this.map?.delete(userId);
        return true;
    };
    get = (userId) => {
        if (this.map?.get(userId) === undefined) {
            return new Error('User does not exist');
        }
        return this.map?.get(userId);
    };
    size = () => {
        return this.map?.size;
    };
    get clients() {
        return this.map.entries();
    }
}
export const LocalClients = ClientMap.getInstance();
