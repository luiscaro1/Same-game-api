import knex, { Knex } from 'knex';
import knexfile from '@/Db/Knexfile';

import Injectable from '@/Decorators/Injectable';

console.log(process.env.DB_HOST);

@Injectable('dbContext')
class DbContext {
  public db: Knex;

  constructor() {
    this.db = knex(
      process.env.NODE_ENV === 'production'
        ? knexfile.production
        : knexfile.development
    );
  }

  // TODO: insert getters and setters for the different tables
}

export default DbContext;
