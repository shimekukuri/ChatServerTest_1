import { LocalClients } from '../../utilities/WSSwitcher/ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
import { ClientSocket } from '../ClientSockt/ClientSocket.js';
import { WebSocket } from 'ws';

export class ClientPrune {
  private IdResolver: typeof LocalClients;
  private NameResolver: typeof ResolveName;

  constructor() {
    this.IdResolver = LocalClients;
    this.NameResolver = ResolveName;

    this.pruneInterval();
  }

  pruneInterval = () => {
    setInterval(() => {
      for (let client of this.IdResolver.clients) {
        console.log(client);
      }
    }, 1000);
  };
}
