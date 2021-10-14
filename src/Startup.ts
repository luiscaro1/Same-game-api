import express from 'express';
import cors from 'cors';
import http from 'http';
import '@/Lib/Env';
import Router from '@/Router';
import '@/Controllers/InstantiateControllers';
import Inject from '@/Decorators/Inject';

import SocketServer from '@/SocketServer';

class Application {
  @Inject('router') private static routehandler: Router;

  @Inject('socketServer') private static socketServer: SocketServer;

  public static init(): void {
    const PORT: string | number = process.env.PORT || 5004;

    const app = express();

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(this.routehandler.router);

    const httpServer: http.Server = http.createServer(app);
    this.socketServer.listen(httpServer);

    httpServer.listen(PORT);
  }
}

Application.init();

export default Application;
