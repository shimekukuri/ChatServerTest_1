import { LocalClients } from './utilities/ClientMap.js';

setInterval(() => {
  console.log(LocalClients.map?.entries() ?? 'No Entries');
}, 1000);

export {};
