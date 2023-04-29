export class ClientSocket {
    webSocket;
    id;
    terminate;
    timerId;
    constructor(webSocket, id = '') {
        this.webSocket = webSocket;
        this.id = id;
        this.terminate = false;
        this.timerId = undefined;
    }
    messageUser = (message, from) => {
        this.webSocket.send(JSON.stringify({ event: 'message', message: message, from: from }));
    };
    eventMatch = (eventDetails) => {
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
            }
            else {
                this.ping();
            }
        }, 30000);
    };
}
