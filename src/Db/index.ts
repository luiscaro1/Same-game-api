import knex, { Knex } from 'knex';
import knexfile from '@/Db/Knexfile';

import Injectable from '@/Decorators/Injectable';

const { development, production } = knexfile;

@Injectable('dbContext')
class DbContext {
  public db: Knex;

  constructor() {
    this.db = knex(production);
  }

  // TODO: insert getters and setters for the different tables
}

export default DbContext;
