import { LocalClients } from './ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
import { ClientSocket } from '../ClientSocket.js';
export class WSSwitcher {
    events;
    IdResolver;
    NameResolver;
    constructor() {
        this.events = new Map();
        this.IdResolver = LocalClients;
        this.NameResolver = ResolveName;
    }
    eventInterface = (event, ws) => { };
    register = (userName, userID, ws) => {
        try {
            if (ws === undefined) {
                return new Error('WebSocket required');
            }
            this.NameResolver.addName(userName, userID);
            this.IdResolver.addClient(userID, new ClientSocket(ws));
        }
        catch (err) {
            console.error(err);
        }
    };
    messageUser = (message, sendTo, from, ws) => {
        if (message === '' || sendTo === '' || from === '') {
            ws.send(JSON.stringify({ event: 'messageError', message: 'Missing Fields' }));
            return;
        }
        try {
            const destination = this.IdResolver.get(sendTo);
            destination.messageUser(message, from);
        }
        catch (err) {
            ws.send(JSON.stringify({ event: 'messageError', message: err }));
        }
    };
    findUser = (userName) => {
        try {
            this.IdResolver.get(userName);
        }
        catch (err) { }
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
