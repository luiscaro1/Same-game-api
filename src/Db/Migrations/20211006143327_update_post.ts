import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('Post', (table) => {
    table.uuid('gid').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('Post', (table) => {
    table.dropColumn('gid');
  });
}
