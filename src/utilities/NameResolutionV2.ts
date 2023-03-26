class NameRolution {
  private static instance: NameRolution;
  map: Map<string, string>;

  constructor() {
    this.map = new Map();
  }

  public static getInstance = () => {
    if (!NameRolution.instance) {
      this.instance = new NameRolution();
      return NameRolution.instance;
    } else {
      return NameRolution.instance;
    }
  };

  addName = (name: string, id: string) => {
    this.map?.set(name, id);
  };

  removeName = (name: string, id: string) => [this.map?.delete(name)];

  find = (name: string) => {
    if (!this.map.has(name)) {
      throw new Error('User Not Found');
    }
    return this.map.get(name);
  };
}

export const ResolveName = NameRolution.getInstance();
