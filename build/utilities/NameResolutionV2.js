class NameRolution {
    static instance;
    map;
    constructor() {
        this.map = new Map();
    }
    static getInstance = () => {
        if (!NameRolution.instance) {
            this.instance = new NameRolution();
            return NameRolution.instance;
        }
        else {
            return NameRolution.instance;
        }
    };
    addName = (name, id) => {
        this.map?.set(name, id);
    };
    removeName = (name, id) => [this.map?.delete(name)];
    find = (name) => {
        if (!this.map.has(name)) {
            throw new Error('User Not Found');
        }
        return this.map.get(name);
    };
}
export const ResolveName = NameRolution.getInstance();
