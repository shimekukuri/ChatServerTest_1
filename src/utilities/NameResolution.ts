class NameRolution {
  private static instance: NameRolution;
  public map: Map<string, any> | undefined;

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
}

export const ResolveName = NameRolution.getInstance();
