export class ClientSocket {
    webSocket;
    constructor(webSocket) {
        this.webSocket = webSocket;
    }
    message = (message, from) => {
        this.webSocket.send(JSON.stringify({ event: 'message', message: message, from: from }));
    };
    close = () => {
        this.webSocket.close();
    };
}
