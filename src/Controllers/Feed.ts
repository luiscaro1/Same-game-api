import express from 'express';
import FeedDAO from '@/Daos/Feed';
import Inject from '@/Decorators/Inject';
import Injectable from '@/Decorators/Injectable';
import Upload from '@/Storage/Upload';
import route from '@/Decorators/Route';

@Injectable('feedController')
class FeedController {
  @Inject('feedDAO') public static feedDAO: FeedDAO;

  @Inject('upload') public static multer: Upload;

  @route('POST', FeedController.multer.upload.array('files'), 'post')
  public static async createPost(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { files, body } = req;
    try {
      await FeedController.feedDAO.createPost(body, files as any);
      res.status(201).end();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('DELETE', ':id')
  public static async deletePost(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      await FeedController.feedDAO.deletePost(req.params.id as any);
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }

  @route('GET', ':id')
  public static async getPostsByGame(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      console.log(req.params);
      const posts = await FeedController.feedDAO.getPostsByGame(
        req.params.id as any
      );
      res.json(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default FeedController;
