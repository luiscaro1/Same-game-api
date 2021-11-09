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
  mic: boolean;
  rank: string;
}

interface Lobby {
  lid: string;
  description: string;
  members: Array<string>;
  created_at: Date;
  updated_at: Date;
  platform: string;
  region: string;
  mic: boolean;
  rank: string;
}

interface UserLobby {
  gid: string;
  uid: string;
  lid: string;
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
    platform,
    region,
    mic,
    rank,
  }: LobbyBody): Promise<void> {
    await this.dbContext.db
      .insert({
        region,
        uid,
        gid,
        description,
        platform,
        mic,
        rank,
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
      await db.raw(`select * from "Lobby" as L natural inner join (select uid,user_name,avatar_url from "User")as U
    where l.uid = U.uid and l.gid='${gid}' order by created_at desc`)
    ).rows;

    return lobbies;
  }

  public async getLobbyById(lid: string): Promise<Array<Lobby>> {
    const { db } = this.dbContext;
    const lobby = (
      await db.raw(`select * from "Lobby" as L natural inner join (select uid,user_name,avatar_url from "User")as U
    where l.uid = U.uid and l.lid='${lid}' order by created_at desc`)
    ).rows[0];

    return lobby;
  }

  public async getLobbiesByUser(uid: string): Promise<Array<Lobby>> {
    const { db } = this.dbContext;
    const lobbies = (
      await db.raw(`select * from "Lobby" as L natural inner join (select uid,user_name,avatar_url from "User")as U
    where l.uid = U.uid and l.uid='${uid}' order by created_at desc`)
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

  public async getMembersInLobby(
    lid: string
  ): Promise<{ [uid: string]: UserLobby }> {
    const members = (
      await this.dbContext.db
        .raw(`select * from "UserLobby" as UL natural inner join (select uid,user_name,avatar_url from "User") as U
    where UL.uid = U.uid and UL.lid = '${lid}'`)
    ).rows;

    const dict: { [uid: string]: UserLobby } = {};

    members.forEach((member: UserLobby) => {
      dict[member.uid] = member;
    });

    return dict;
  }
}

export default LfgDAO;
