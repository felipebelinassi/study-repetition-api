import * as server from './app';

const port = Number(process.env.PORT);

const start = async () => await server.start(port);

start();
