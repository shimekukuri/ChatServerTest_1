import { WebSocket } from 'ws';

interface eventDetail {
  //finish this
}

export class ClientSocket {
  webSocket: WebSocket;
  id: string;
  terminate: boolean;
  timerId: NodeJS.Timeout | undefined;

  constructor(webSocket: WebSocket, id = '') {
    this.webSocket = webSocket;
    this.id = id;
    this.terminate = false;
    this.timerId = undefined;
  }

  messageUser = (message: string, from: string): void => {
    this.webSocket.send(
      JSON.stringify({ event: 'message', message: message, from: from })
    );
  };

  eventMatch = (eventDetails: any): void => {
    this.webSocket.send(JSON.stringify({ event: 'event', data: eventDetails }));
  };

  close = () => {
    this.webSocket.close();
  };

  //posibly
  ping = () => {
    this.webSocket.ping();
    this.terminate = true;
    this.timerId = setTimeout(() => {
      console.log('pinged');
      if (this.terminate) {
        this.webSocket.terminate();
        return this.webSocket;
      } else {
        this.ping();
      }
    }, 30000);
  };
}
