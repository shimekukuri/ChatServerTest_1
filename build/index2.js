import { WebSocketServer } from 'ws';
import { WSSwitcher } from './utilities/WSSwitcher/WSSwitcher.js';
const wss = new WebSocketServer({ port: 5555 });
const switcher = new WSSwitcher();
wss.on('connection', (ws, req) => {
    ws.send(JSON.stringify({ event: 'register' }));
    ws.on('close', () => { });
    ws.on('message', (data) => {
        const ev = JSON.parse(data.toString());
        switcher.eventInterface(ev, ws);
    });
});
