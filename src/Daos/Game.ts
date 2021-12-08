import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/Index';

interface GameBody {
  name: string;
  released: string;
  platforms: Array<string>;
}

@Injectable('gameDAO')
class GameDAO {
  @Inject('dbContext') public dbContext!: DbContext;

  public async addGame({ name, platforms }: GameBody): Promise<void> {
    await this.dbContext.db
      .insert({
        name,
        platforms,
      })
      .into('Game');
  }

  public async getAllGames(): Promise<Array<GameBody>> {
    const games = await this.dbContext.db.select().from('Game');

    return games;
  }

  public async getGameById(gid: string): Promise<Array<GameBody>> {
    const game = (
      await this.dbContext.db.select().from('Game').where('gid', '=', gid)
    )[0];

    return game;
  }
}

export default GameDAO;
