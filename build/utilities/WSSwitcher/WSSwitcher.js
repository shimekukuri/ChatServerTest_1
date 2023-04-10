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
            ws.send(JSON.stringify({ event: 'error', message: err }));
        }
    };
    findUser = (userName, ws) => {
        try {
            let userId = this.IdResolver.get(userName);
            ws.send(JSON.stringify({ event: 'findUser', userId: userId }));
        }
        catch (err) {
            ws.send(JSON.stringify({ event: 'error', message: err }));
        }
    };
    disconnect = (userId) => {
        this.IdResolver.removeClient(userId);
    };
}
