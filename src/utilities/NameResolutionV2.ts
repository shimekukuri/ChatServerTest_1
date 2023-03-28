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

  public addName = (name: string, id: string) => {
    if (this.map?.has(name)) {
      return new Error('User Already Exists');
    }
    this.map?.set(name, id);
    return true;
  };

  public removeName = (name: string, id: string) => {
    if (!this.map?.has(name)) {
      return new Error('User does not exist');
    }
    this.map?.delete(name);
    return true;
  };

  public find = (name: string) => {
    if (!this.map.has(name)) {
      throw new Error('User Not Found');
    }
    return this.map.get(name);
  };

  public get clients() {
    return this.map.entries;
  }
}

export const ResolveName = NameRolution.getInstance();
