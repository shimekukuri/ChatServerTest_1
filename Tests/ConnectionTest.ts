import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:5555');

ws.on('open', () => {
  console.log('connected');
});

ws.on('message', (data) => {
  const ev: any = JSON.parse(data.toString());

  switch (ev.event) {
    case 'register': {
      ws.send(
        JSON.stringify({ event: 'register', userID: '1', userName: 'Test1' })
      );
      break;
    }
    case 'message': {
      console.log(ev.message);
    }
  }
});

setTimeout(() => {
  ws.send(
    JSON.stringify({
      event: 'messageUser',
      sendTo: '2341',
      message: 'From Client 1',
      from: '1',
    })
  );
}, 5000);
