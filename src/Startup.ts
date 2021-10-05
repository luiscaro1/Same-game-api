import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import '@/Lib/Env';
import Router from '@/Router';
import '@/Controllers/InstantiateControllers';
import Inject from '@/Decorators/Inject';
import EventHandlers from '@/SocketEventHandlers/EventHandler';

class Application {
  @Inject('router') private static routehandler: Router;

  public static init(): void {
    const PORT: string | number = process.env.PORT || 5003;

    const app = express();

    app.use(cors({ credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(this.routehandler.router);

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });

    io.on('connection', EventHandlers);

    server.listen(PORT);
  }
}

Application.init();

export default Application;
