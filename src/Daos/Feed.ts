import { v4 as uuid } from 'uuid';
import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import DbContext from '@/Db/index';

interface Post {
  gid: string;
  created_at: Date;
  text: string;
}

// NOTE: We get the file type from mimetype

@Injectable('feedDAO')
class FeedDAO {
  @Inject('dbContext') public dbContext!: DbContext;

  public async createPost({ text, gid }: Post, files: any): Promise<void> {
    await this.dbContext.db
      .insert({
        gid,
        pid: uuid(),
        text,
        attachments: files,
      })
      .into('Post');
  }
}

export default FeedDAO;
