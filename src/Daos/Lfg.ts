import { v4 as uuid } from 'uuid';
import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/Index';
import SocketServer from '@/SocketServer';

interface LobbyBody extends Body {
  uid: string;
  gid: string;
  description: string;
  platform: string;
  region: string;
}

interface Lobby {
  lid: string;
  description: string;
  members: Array<string>;
  created_at: Date;
  updated_at: Date;
  platform: string;
  region: string;
}

@Injectable('lfgDAO')
class LfgDAO {
  @Inject('dbContext') public dbContext!: DbContext;

  @Inject('socketServer') public socketServer!: SocketServer;

  public async createLobby({
    uid,
    gid,
    description,
    platform,
    region,
  }: LobbyBody): Promise<void> {
    await this.dbContext.db
      .insert({
        region,
        uid,
        gid,
        description,
        platform,
      })
      .into('Lobby');

    this.socketServer.socket.emit('NEW_LOBBY');
  }

  public async deleteLobby(lid: string): Promise<void> {
    // TODO: Acess db and delete lobby
    await this.dbContext.db.delete().from('Lobby').where('lid', '=', lid);
  }

  public async getLobbiesByGame(gid: string): Promise<Array<Lobby>> {
    const { db } = this.dbContext;
    const lobbies = (
      await db.raw(`select * from "Lobby" as L natural inner join (select uid,user_name from "User" as U where U.uid=uid
      ) as foo  order by created_at desc`)
    ).rows;
    return lobbies;
  }

  public async joinLobby({
    lid,
    gid,
    uid,
  }: {
    lid: string;
    gid: string;
    uid: string;
  }): Promise<void> {
    await this.dbContext.db.insert({ lid, gid, uid }).into('UserLobby');
  }
}

export default LfgDAO;
