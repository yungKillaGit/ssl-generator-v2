import {readFileSync} from 'fs';
import * as http from 'http';
import * as https from 'https';

import {createApp} from '../app';

const app = createApp();
const port = 80;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

if (process.env.HTTPS) {
    const server = https.createServer({
        key: readFileSync('./server-private-key.pem'),
        cert: readFileSync('./fullchain.pem'),
    }, app);
    server.listen(443, () => {
        console.log('Listening on port 443');
    });
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    console.log(`Defined environment ${process.env.NODE_ENV}`);
}
