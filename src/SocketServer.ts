import { Socket, Server } from 'socket.io';
import http from 'http';
import Injectable from './Decorators/Injectable';

@Injectable('socketServer')
class SocketServer {
  public socket!: Socket;

  public listen(httpServer: http.Server) {
    const io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    io.on('connection', (socket: Socket) => {
      this.socket = socket;
      console.log('new connection established');
    });
  }
}

export default SocketServer;
