import { WebSocketServer } from 'ws';
import { LocalClients } from './utilities/ClientMap.js';
import { ResolveName } from './utilities/NameResolutionV2.js';
import { ClientSocket } from './utilities/ClientSocket.js';
// import './index2.js';
const wss = new WebSocketServer({ port: 5556 });
wss.on('connection', (ws, req) => {
    ws.send(JSON.stringify({ event: 'register' }));
    ws.on('close', () => { });
    ws.on('message', (data) => {
        const ev = JSON.parse(data.toString());
        switch (ev.event) {
            case 'register': {
                ResolveName.addName(ev.userName, ev.userID);
                console.log('Resolver added:', ResolveName.find(ev.userName));
                LocalClients.map?.set(ev.userID, new ClientSocket(ws));
                //new ClientSocket works integrate it into the other functions of the wss server better.
                console.log('Active Users:', LocalClients?.map?.size);
                break;
            }
            case 'messageUser': {
                const { message, sendTo, from } = ev;
                console.log('From: ', from);
                console.log(`Messaging User ${sendTo}, ${message}`);
                if (!message || !sendTo) {
                    console.error('Incomplete Data');
                    ws.send(JSON.stringify({ message: 'Incomplete Data', error: 1 }));
                }
                if (!LocalClients.map?.has(sendTo)) {
                    console.error('Cannot Find User:', sendTo);
                    ws.send(JSON.stringify({ message: 'User Not Logged In', error: 2 }));
                    return;
                }
                try {
                    LocalClients.map?.get(sendTo).message(message, from);
                }
                catch (err) {
                    console.error(err);
                }
                break;
            }
            case 'findUser': {
                console.log('findUser fired');
                console.log('ev.userName:', ev.userName);
                try {
                    ResolveName.find(ev.userName);
                    ws.send(JSON.stringify({
                        userID: ResolveName.find(ev.userName),
                        event: 'userFound',
                    }));
                }
                catch (err) {
                    console.log('catched error');
                    ws.send(JSON.stringify({
                        event: 'userNotFound',
                    }));
                    return;
                }
                break;
                // if (ResolveName.find(ev.userName)) {
                //   ws.send(
                //     JSON.stringify({
                //       userID: ResolveName.map?.get(ev.userName),
                //       event: 'userFound',
                //     })
                //   );
                // }
                // break;
            }
            case 'disconnect':
                {
                    if (ResolveName.map?.has(ev.userName)) {
                        ResolveName.map?.delete(ev.userName);
                        console.log(ev.userName, 'removed from Name Resolver');
                    }
                    if (LocalClients.map?.has(ev.userID)) {
                        LocalClients.map?.delete(ev.userID);
                        console.log(ev.userName, 'has been removed from LocalClients');
                    }
                }
                break;
        }
    });
});
