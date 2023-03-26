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
        JSON.stringify({
          event: 'register',
          userID: '4',
          userName: 'ConnectionTest3',
        })
      );
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
      console.log('User Not found');
      break;
    }
  }
});

setTimeout(() => {
  ws.send(
    JSON.stringify({
      event: 'messageUser',
      sendTo: '640a1e56605518b3b74dc4d1',
      message: 'From Client 4',
      from: '4',
      date: new Date().toLocaleTimeString(),
    })
  );
}, 1000);

setTimeout(() => {
  ws.send(
    JSON.stringify({
      event: 'findUser',
      userName: 'mar91248',
    })
  );
}, 2000);
