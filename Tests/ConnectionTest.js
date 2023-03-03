import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:5555');
ws.on('open', () => {
    console.log('connected');
});
ws.on('message', (data) => {
    const ev = JSON.parse(data.toString());
    switch (ev.event) {
        case 'register': {
            ws.send(JSON.stringify({ event: 'register', userID: '1' }));
        }
    }
});
setTimeout(() => {
    ws.send(JSON.stringify({
        event: 'messageUser',
        sendTo: '2',
        message: 'From Client 1',
    }));
}, 5000);
// ws.on('test', () => {
//   ws.send(
//     JSON.stringify({
//       sendTo: 2,
//       message: 'from client 1',
//       event: 'messageUser',
//     })
//   );
// });
