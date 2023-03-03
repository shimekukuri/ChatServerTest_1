class ClientMap {
  private static instance: ClientMap;
  public map: Map<string, any> | undefined;

  constructor() {
    this.map = new Map();
  }

  public static getInstance = () => {
    if (!ClientMap.instance) {
      this.instance = new ClientMap();
      return ClientMap.instance;
    } else {
      return ClientMap.instance;
    }
  };
}

export const LocalClients = ClientMap.getInstance();
