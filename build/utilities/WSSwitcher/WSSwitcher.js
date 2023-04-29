import { LocalClients } from './ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
import { ClientSocket } from '../ClientSockt/ClientSocket.js';
export class WSSwitcher {
    events;
    IdResolver;
    NameResolver;
    constructor() {
        this.events = new Map();
        this.IdResolver = LocalClients;
        this.NameResolver = ResolveName;
    }
    eventInterface = (event, ws) => {
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
                    const user = this.IdResolver.get(event.from);
                    user.terminate = false;
                    console.log('ponged');
                }
                catch (e) {
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
    sendEvent = (message, sendTo, timer, image = '', ws) => {
        if (message === '' || sendTo === '' || timer === 0) {
            ws.send(JSON.stringify({ event: 'messageError', message: 'Missing Fields' }));
        }
        try {
            const destination = this.IdResolver.get(sendTo);
            destination.eventMatch({
                text: message,
                image: image,
                timer: 10000,
            });
        }
        catch (err) {
            ws.send(JSON.stringify({ event: 'error', message: err }));
        }
    };
    messageUser = (message, sendTo, from, ws) => {
        console.log('messageUser fired');
        if (message === '' || sendTo === '' || from === '') {
            ws.send(JSON.stringify({ event: 'messageError', message: 'Missing Fields' }));
            return;
        }
        try {
            const destination = this.IdResolver.get(sendTo);
            destination.messageUser(message, from);
        }
        catch (err) {
            ws.send(JSON.stringify({ event: 'error', message: err }));
        }
    };
    findLocalUser = (userName, ws) => { };
    findUser = (userName, ws) => {
        try {
            let userId = this.IdResolver.get(userName);
            ws.send(JSON.stringify({ event: 'findUser', userId: userId }));
        }
        catch (err) {
            ws.send(JSON.stringify({ event: 'error', message: err }));
        }
    };
    disconnect = (userId, ws) => {
        console.log(ws);
        if (userId === undefined && ws) {
            for (let client of this.IdResolver.clients) {
                console.log(client);
            }
        }
        // this.IdResolver.removeClient(userId);
    };
}
