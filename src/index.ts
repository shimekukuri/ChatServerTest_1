import WebSocket, { WebSocketServer } from 'ws';
import { LocalClients } from './utilities/ClientMap.js';
// import './index2.js';

const wss = new WebSocketServer({ port: 5555 });

wss.on('connection', (ws, req) => {
  ws.send(JSON.stringify({ event: 'register' }));

  ws.on('message', (data) => {
    const ev = JSON.parse(data.toString());

    switch (ev.event) {
      case 'register': {
        LocalClients.map?.set(ev.userID, ws);
        console.log(LocalClients.map?.entries());
        console.log(wss.clients.size);
        break;
      }

      case 'messageUser': {
        const { message, sendTo, from } = ev;
        console.log(`Messaging User ${sendTo}, ${message}`);
        if (!message || !sendTo) {
          console.error('Incomplete Data');
          ws.send(JSON.stringify({ message: 'Incomplete Data', error: 1 }));
        }
        if (!LocalClients.map?.has(sendTo)) {
          console.error('Cannot Find User');
          ws.send(JSON.stringify({ message: 'User Not Logged In', error: 2 }));
        }
        const destination = LocalClients.map?.get(
          sendTo
        ) as WebSocket.WebSocket;
        destination.send(
          JSON.stringify({ message: message, event: 'message', from: from })
        );
      }
    }
  });
});

// wss.on('connection', (ws, req) => {
//   ws.on('message', (data) => {
//     const event = JSON.parse(data.toString());

//     switch(event.event) {
//       case 'messageUser': {
//         let clientID = event.sentTo;

//       }
//     }

//     let clientID = JSON.parse(req.toString());
//     LocalClients.map?.set(clientID.user, ws);
//     // console.log(LocalClients.map?.entries());

//     console.log('fired');
//     const x = JSON.parse(data.toString());

//     // console.log(LocalClients.map?.get(x.sentTo));
//   });
// });
