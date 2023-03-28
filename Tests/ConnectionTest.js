import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:5556');
ws.on('open', () => {
    console.log('connected');
});
ws.on('message', (data) => {
    const ev = JSON.parse(data.toString());
    switch (ev.event) {
        case 'register': {
            ws.send(JSON.stringify({
                event: 'register',
                userID: '1',
                userName: 'ConnectionTest1',
            }));
            break;
        }
        case 'message': {
            console.log(ev.message);
            break;
        }
        case 'userFound': {
            console.log(ev.userID);
            break;
        }
        case 'userNotFound': {
            console.log('User Not Found');
            break;
        }
    }
});
setTimeout(() => {
    ws.send(JSON.stringify({
        event: 'messageUser',
        sendTo: '2',
        message: 'From Client 1',
        from: '1',
        date: new Date().toLocaleTimeString(),
    }));
}, 1000);
setTimeout(() => {
    ws.send(JSON.stringify({
        event: 'findUser',
        userName: 'mar91248',
    }));
}, 2000);
