import { WebSocket } from 'ws';

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

  close = () => {
    this.webSocket.close();
  };
}
