import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/Index';

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
  }

  public async deletePost(pid: string): Promise<void> {
    await this.dbContext.db.delete().from('Post').where('pid', '=', pid);
  }

  public async getPostsByGame(gid: string): Promise<Array<PostBody>> {
    const posts = await this.dbContext.db
      .select()
      .from('Post')
      .where('gid', '=', gid);

    return posts;
  }
}

export default FeedDAO;
