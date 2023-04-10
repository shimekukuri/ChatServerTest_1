import { WebSocket } from 'ws';
import { ClientSocket } from '../../ClientSockt/ClientSocket.js';

class ClientMap {
  private static instance: ClientMap;
  map: Map<string, ClientSocket>;

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

  public addClient = (userId: string, ws: ClientSocket) => {
    if (this.map?.has(userId)) {
      return new Error('User Already Exists');
    }
    this.map?.set(userId, ws);
    return true;
  };

  public removeClient = (userId: string) => {
    if (!this.map?.has(userId)) {
      return new Error('User does not exist');
    }
    this.map?.delete(userId);
    return true;
  };

  public get = (userId: string): ClientSocket | Error => {
    if (this.map?.get(userId) === undefined) {
      return new Error('User does not exist');
    }
    return this.map?.get(userId)!;
  };

  public size = () => {
    return this.map?.size;
  };

  public get clients() {
    return this.map.entries();
  }
}

export const LocalClients = ClientMap.getInstance();
