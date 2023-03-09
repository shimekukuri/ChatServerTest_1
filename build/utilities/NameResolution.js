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
}
export const ResolveName = NameRolution.getInstance();
