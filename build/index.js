import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 5555 });
wss.on('connection', (ws, req) => { });
