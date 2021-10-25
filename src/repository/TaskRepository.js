import Client from './Clients/Fetch.js';

const resource = 'src/data/tasks-demo-data.json';

export default {
    get() {
        return Client.get(resource);
    },
}