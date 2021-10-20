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
      await LfgController.lfgDAO.createLobby(req.body as any);
      res.status(201).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('DELETE', ':id')
  public static async deleteLobby(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    // TODO: implement DAO
    try {
      await LfgController.lfgDAO.deleteLobby(req.params.id as any);
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

  @route('POST', 'join')
  public static async joinLobby(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await LfgController.lfgDAO.joinLobby(req.body as any);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', 'user/:id')
  public static async getLobbiesByUser(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const lobbies = await LfgController.lfgDAO.getLobbiesByUser(
        req.params.id
      );
      res.json(lobbies);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', 'lobby/:id')
  public static async getLobbyById(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const lobby = await LfgController.lfgDAO.getLobbyById(req.params.id);
      res.json(lobby);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default LfgController;
