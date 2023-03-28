export class ClientSocket {
    webSocket;
    constructor(webSocket) {
        this.webSocket = webSocket;
    }
    messageUser = (message, from) => {
        this.webSocket.send(JSON.stringify({ event: 'message', message: message, from: from }));
    };
    close = () => {
        this.webSocket.close();
    };
}
