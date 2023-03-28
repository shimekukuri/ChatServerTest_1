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
    console.log(event);
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
      console.log(this.NameResolver.clients);
      console.log(this.IdResolver.clients);
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
      console.log(destination);
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

// switch (ev.event) {
//   case 'register': {
//     ResolveName.addName(ev.userName, ev.userID);
//     console.log('Resolver added:', ResolveName.find(ev.userName));
//     LocalClients.map?.set(ev.userID, new ClientSocket(ws));
//     //new ClientSocket works integrate it into the other functions of the wss server better.
//     console.log('Active Users:', LocalClients?.map?.size);
//     break;
//   }

//   case 'messageUser': {
//     const { message, sendTo, from } = ev;
//     console.log('From: ', from);
//     console.log(`Messaging User ${sendTo}, ${message}`);
//     if (!message || !sendTo) {
//       console.error('Incomplete Data');
//       ws.send(JSON.stringify({ message: 'Incomplete Data', error: 1 }));
//     }
//     if (!LocalClients.map?.has(sendTo)) {
//       console.error('Cannot Find User:', sendTo);
//       ws.send(JSON.stringify({ message: 'User Not Logged In', error: 2 }));
//       return;
//     }

//     try {
//       LocalClients.map?.get(sendTo).message(message, from);
//     } catch (err) {
//       console.error(err);
//     }
//     break;
//   }

//   case 'findUser': {
//     console.log('findUser fired');
//     console.log('ev.userName:', ev.userName);

//     try {
//       ResolveName.find(ev.userName);
//       ws.send(
//         JSON.stringify({
//           userID: ResolveName.find(ev.userName),
//           event: 'userFound',
//         })
//       );
//     } catch (err) {
//       console.log('catched error');
//       ws.send(
//         JSON.stringify({
//           event: 'userNotFound',
//         })
//       );
//       return;
//     }
//     break;

//     // if (ResolveName.find(ev.userName)) {
//     //   ws.send(
//     //     JSON.stringify({
//     //       userID: ResolveName.map?.get(ev.userName),
//     //       event: 'userFound',
//     //     })
//     //   );
//     // }
//     // break;
//   }

//   case 'disconnect':
//     {
//       if (ResolveName.map?.has(ev.userName)) {
//         ResolveName.map?.delete(ev.userName);
//         console.log(ev.userName, 'removed from Name Resolver');
//       }
//       if (LocalClients.map?.has(ev.userID)) {
//         LocalClients.map?.delete(ev.userID);
//         console.log(ev.userName, 'has been removed from LocalClients');
//       }
//     }
//     break;
// }
// });
