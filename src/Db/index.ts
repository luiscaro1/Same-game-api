import knex, { Knex } from 'knex';
import knexfile from '@/Db/Knexfile';

import Injectable from '@/Decorators/Injectable';

@Injectable('dbContext')
class DbContext {
  public db: Knex;

  constructor() {
    this.db = knex(knexfile);
  }

  // TODO: insert getters and setters for the different tables
}

export default DbContext;
