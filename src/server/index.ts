import { merge } from 'lodash';
// a express and socket.io server
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { GameSession } from '../types';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

const PORT = process.env.PORT || 5000;
const dist_dir =  path.join(__dirname, '../../dist');
const data_dir = path.join(__dirname, '../../data');
app.use('/public', express.static(dist_dir));
const templatePath = path.join(dist_dir, 'index.html');

app.get('/*', (req, res, next) => {
    if (req.headers['accept']?.indexOf('text/html') !== -1) {
        // send template
        const template = fs.existsSync(templatePath) ?  fs.readFileSync(templatePath) : '';
        res.set('content-type', 'text/html');
        res.end(template);
        return;
    }
    next();
});

let currentGameSession: GameSession = {
    date: new Date().toISOString(),
    startScore: 0,
    currentScore: 0,
    rounds: [],
};

const save_file = path.join(data_dir, 'data.json');
if (fs.existsSync(save_file)) {
    try {
        currentGameSession = JSON.parse(fs.readFileSync(save_file, 'utf-8'));
    } catch (error) {
        console.log(error);
    }
}


io.on('connection', (socket: Socket) => {
    // admin socket can update the state of the game
    // client socket can only read the state of the game
    console.log('a user connected', socket.handshake.query);
    if (socket.handshake.query.admin) {
        console.log('admin connected');

        socket.on('update', (data) => {
            console.log('update', data);
            currentGameSession = data;
            fs.writeFile(save_file, JSON.stringify(data), (err) => {
                if (err) {
                    console.log('update data store failed', err);
                }
            });
            io.emit('update', data);
        });
    }

    socket.emit('update', currentGameSession);
});

httpServer.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});