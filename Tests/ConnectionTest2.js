import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:5555');
ws.on('open', () => {
    console.log('connected');
});
ws.on('message', (data) => {
    const ev = JSON.parse(data.toString());
    switch (ev.event) {
        case 'register': {
            ws.send(JSON.stringify({ event: 'register', userID: '2' }));
            break;
        }
        case 'message': {
            console.log(ev.message);
        }
    }
});
