import { LocalClients } from '../../utilities/WSSwitcher/ClientMap/ClientMapV2.js';
import { ResolveName } from '../NameResolutionV2.js';
export class ClientPrune {
    IdResolver;
    NameResolver;
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
