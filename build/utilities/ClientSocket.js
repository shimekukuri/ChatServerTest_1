export class ClientSocket {
    webSocket;
    id;
    constructor(webSocket, id = '') {
        this.webSocket = webSocket;
        this.id = id;
    }
    messageUser = (message, from) => {
        this.webSocket.send(JSON.stringify({ event: 'message', message: message, from: from }));
    };
    eventMatch = (eventDetails) => {
        this.webSocket.send(JSON.stringify({ event: 'eventMatch', data: eventDetails }));
    };
    close = () => {
        this.webSocket.close();
    };
}
