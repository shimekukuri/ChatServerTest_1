import { WebSocket } from 'ws';

export class ClientSocket {
  webSocket: WebSocket;

  constructor(webSocket: WebSocket) {
    this.webSocket = webSocket;
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
