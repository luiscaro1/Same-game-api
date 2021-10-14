import { v4 as uuid } from 'uuid';
import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/Index';
import SocketServer from '@/SocketServer';

interface LobbyBody extends Body {
  uid: string;
  gid: string;
  description: string;
}

interface Lobby {
  lid: string;
  description: string;
  members: Array<string>;
  created_at: Date;
  updated_at: Date;
}

@Injectable('lfgDAO')
class LfgDAO {
  @Inject('dbContext') public dbContext!: DbContext;

  @Inject('socketServer') public socketServer!: SocketServer;

  public async createLobby({
    uid,
    gid,
    description,
  }: LobbyBody): Promise<void> {
    console.log({
      uid,
      gid,
      description,
    });

    await this.dbContext.db
      .insert({
        uid,
        gid,
        description,
      })
      .into('Lobby');

    this.socketServer.socket.emit('NEW_LOBBY');
  }

  public async deleteLobby(lid: string): Promise<void> {
    // TODO: Acess db and delete lobby
    await this.dbContext.db.delete().from('Lobby').where('lid', '=', lid);
  }

  public async getLobbiesByGame(gid: string): Promise<Array<Lobby>> {
    const lobbies = await this.dbContext.db
      .select()
      .from('Lobby')
      .where('gid', '=', gid);

    return lobbies;
  }
}

export default LfgDAO;
