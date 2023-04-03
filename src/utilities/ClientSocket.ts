import { WebSocket } from 'ws';

interface eventDetail {
  //finish this
}

export class ClientSocket {
  webSocket: WebSocket;
  id: string;

  constructor(webSocket: WebSocket, id = '') {
    this.webSocket = webSocket;
    this.id = id;
  }

  messageUser = (message: string, from: string): void => {
    this.webSocket.send(
      JSON.stringify({ event: 'message', message: message, from: from })
    );
  };

  eventMatch = (eventDetails: any): void => {
    this.webSocket.send(
      JSON.stringify({ event: 'eventMatch', data: eventDetails })
    );
  };

  close = () => {
    this.webSocket.close();
  };
}
