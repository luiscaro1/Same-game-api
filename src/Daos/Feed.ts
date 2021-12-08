import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/Index';
import SocketServer from '@/SocketServer';

interface PostBody {
  gid: string;
  uid: string;
  created_at: Date;
  text: string;
}

// NOTE: We get the file type from mimetype

@Injectable('feedDAO')
class FeedDAO {
  @Inject('dbContext') public dbContext!: DbContext;

  @Inject('socketServer') public socketServer!: SocketServer;

  public async createPost(
    { text, gid, uid }: PostBody,
    files: any
  ): Promise<void> {
    await this.dbContext.db
      .insert({
        uid,
        gid,
        text,
        attachments: files,
      })
      .into('Post');
    this.socketServer.socket.emit('NEW_POST');
  }

  public async deletePost(pid: string): Promise<void> {
    await this.dbContext.db.delete().from('Post').where('pid', '=', pid);
  }

  public async getPostsByGame(gid: string): Promise<Array<PostBody>> {
    const { db } = this.dbContext;
    const posts = (
      await db.raw(`select * from "Post" as L natural inner join (select uid,user_name,avatar_url from "User")as U
    where l.uid = U.uid order by created_at desc`)
    ).rows;

    // .select()
    // .from('Post')
    // .where('gid', '=', gid)
    // .orderBy('created_at', 'desc');

    return posts;
  }
}

export default FeedDAO;
