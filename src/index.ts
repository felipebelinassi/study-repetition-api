import * as server from './app';

const port = Number(process.env.PORT);

// eslint-disable-next-line no-console
server.start(port).then(() => console.log(`Server up at port ${port}`));
