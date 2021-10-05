import express from 'express';
import Injectable from '@/Decorators/Injectable';
import route from '@/Decorators/Route';
import Inject from '@/Decorators/Inject';
import LfgDAO from '@/Daos/Lfg';

@Injectable('lfgController')
class LfgController {
  @Inject('lfgDAO') public static lfgDAO: LfgDAO;

  @route('POST', 'create')
  public static async createLobby(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // TODO: implement DAO

    try {
      const lid = await LfgController.lfgDAO.createLobby(req.body as any);
      res.json(lid);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('DELETE', 'delete')
  public static async deleteLobby(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // TODO: implement DAO
    try {
      await LfgController.lfgDAO.deleteLobby(req.body as any);
      res.status(200).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', ':id')
  public static async getLobbiesByGame(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const lobbies = await LfgController.lfgDAO.getLobbiesByGame(
        req.params.id
      );

      res.json(lobbies);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default LfgController;
