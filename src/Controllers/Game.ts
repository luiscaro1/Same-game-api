import express from 'express';
import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import GameDAO from '@/Daos/Game';
import route from '@/Decorators/Route';

@Injectable('gameController')
class GameController {
  @Inject('gameDAO') public static gameDAO: GameDAO;

  @route('POST', 'add')
  public static async addGame(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await GameController.gameDAO.addGame(req.body as any);

      res.status(201).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', 'all')
  public static async getAllGames(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const games = await GameController.gameDAO.getAllGames();
      res.json(games);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', ':id')
  public static async getGameById(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const game = await GameController.gameDAO.getGameById(
        req.params.id as any
      );
      res.json(game);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default GameController;
