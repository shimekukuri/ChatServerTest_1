import { WebSocket } from 'ws';

export class ClientSocket {
  webSocket: WebSocket;

  constructor(webSocket: WebSocket) {
    this.webSocket = webSocket;
  }

  message = (message: string, from: string) => {
    this.webSocket.send(
      JSON.stringify({ event: 'message', message: message, from: from })
    );
  };

  close = () => {
    this.webSocket.close();
  };
}
