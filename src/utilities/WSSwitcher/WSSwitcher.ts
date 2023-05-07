import { LocalClients } from './ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
import { ClientSocket } from '../ClientSockt/ClientSocket.js';
import { WebSocket } from 'ws';

//create an interval that checks the ping status, iterate through each connection and fire a promise ping if any of them fail within 3000
//than terminate the connection and remove them from the Resolvers. 

export class WSSwitcher {
  private events: Map<string, any>;
  private IdResolver: typeof LocalClients;
  private NameResolver: typeof ResolveName;

  constructor() {
    this.events = new Map();
    this.IdResolver = LocalClients;
    this.NameResolver = ResolveName;
  }

  eventInterface = (event: any, ws: WebSocket) => {
    switch (event.event) {
      case 'register': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        this.register(event.userName, event.userID, ws);
        ws.ping(JSON.stringify({ event: 'ping', message: 'ping' }));
        break;
      }
      case 'messageUser': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        console.log(event);
        this.messageUser(event.message, event.sendTo, event.from, ws);
        break;
      }
      case 'findUser': {
        if (ws === undefined) {
          //handle undefined websocket
          this.IdResolver.
          return;
        }
        this.findUser(event.userName, ws);
        break;
      }
      case 'disconnect': {
        console.log('fired 2');
        this.disconnect('', ws);
        break;
      }
      case 'pong': {
        try {
          const user = this.IdResolver.get(event.from) as ClientSocket;
          user.terminate = false;
          console.log('ponged');
        } catch (e) {
          console.error(e);
        }

        break;
      }
      case 'event': {
        if (ws === undefined) {
          //handle undefined websocket
          return;
        }
        console.log(event);
        this.sendEvent(event.text, event.sendTo, 10000, '', ws);
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

  private sendEvent = (
    message: string,
    sendTo: string,
    timer: number,
    image: string = '',
    ws: WebSocket
  ) => {
    if (message === '' || sendTo === '' || timer === 0) {
      ws.send(
        JSON.stringify({ event: 'messageError', message: 'Missing Fields' })
      );
    }

    try {
      const destination = this.IdResolver.get(sendTo) as ClientSocket;

      destination.eventMatch({
        text: message,
        image: image,
        timer: 10000,
      });
    } catch (err) {
      ws.send(JSON.stringify({ event: 'error', message: err }));
    }
  };

  private messageUser = (
    message: string,
    sendTo: string,
    from: string,
    ws: WebSocket
  ) => {
    console.log('messageUser fired');
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

  private findLocalUser = (userName: string, ws: WebSocket) => {};

  private findUser = (userName: string, ws: WebSocket) => {
    try {
      let userId = this.IdResolver.get(userName);
      ws.send(JSON.stringify({ event: 'findUser', userId: userId }));
    } catch (err) {
      ws.send(JSON.stringify({ event: 'error', message: err }));
    }
  };

  private disconnect = (userId: string | undefined, ws: WebSocket) => {
    console.log(ws);
    if (userId === undefined && ws) {
      for (let client of this.IdResolver.clients) {
        console.log(client);
      }
    }
    // this.IdResolver.removeClient(userId);
  };
}
