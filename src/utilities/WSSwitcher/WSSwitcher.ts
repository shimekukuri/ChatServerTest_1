import { LocalClients } from './ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
import { ClientSocket } from '../ClientSocket.js';
import { WebSocket } from 'ws';

export class WSSwitcher {
  private events: Map<string, any>;
  private IdResolver: typeof LocalClients;
  private NameResolver: typeof ResolveName;

  constructor() {
    this.events = new Map();
    this.IdResolver = LocalClients;
    this.NameResolver = ResolveName;
  }

  eventInterface = (event: any, ws?: WebSocket) => {
    switch (event.event) {
      case 'register': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        this.register(event.userName, event.userID, ws);
        break;
      }
      case 'messageUser': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        this.messageUser(event.message, event.sendTo, event.from, ws);
        break;
      }
      case 'findUser': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        this.findUser(event.userName, ws);
        break;
      }
    }
  };

  private register = (userName: string, userID: string, ws: WebSocket) => {
    try {
      if (ws === undefined) {
        return new Error('WebSocket required');
      }
      this.NameResolver.addName(userName, userID);
      this.IdResolver.addClient(userID, new ClientSocket(ws));
    } catch (err) {
      console.error(err);
    }
  };

  private messageUser = (
    message: string,
    sendTo: string,
    from: string,
    ws: WebSocket
  ) => {
    if (message === '' || sendTo === '' || from === '') {
      ws.send(
        JSON.stringify({ event: 'messageError', message: 'Missing Fields' })
      );
      return;
    }

    try {
      const destination = this.IdResolver.get(sendTo) as ClientSocket;
      destination.messageUser(message, from);
    } catch (err) {
      ws.send(JSON.stringify({ event: 'error', message: err }));
    }
  };

  private findUser = (userName: string, ws: WebSocket) => {
    try {
      let userId = this.IdResolver.get(userName);
      ws.send(JSON.stringify({ event: 'findUser', userId: userId }));
    } catch (err) {
      ws.send(JSON.stringify({ event: 'error', message: err }));
    }
  };

  private disconnect = (userId: string) => {
    this.IdResolver.removeClient(userId);
  };
}
