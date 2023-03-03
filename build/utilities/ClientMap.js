export class ClientMap {
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
}
