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
        if (this.map?.has(name)) {
            return new Error('User Already Exists');
        }
        this.map?.set(name, id);
        return true;
    };
    removeName = (name, id) => {
        if (!this.map?.has(name)) {
            return new Error('User does not exist');
        }
        this.map?.delete(name);
        return true;
    };
    find = (name) => {
        if (!this.map.has(name)) {
            throw new Error('User Not Found');
        }
        return this.map.get(name);
    };
}
export const ResolveName = NameRolution.getInstance();
