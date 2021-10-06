import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Post', (table) => {
    table.uuid('pid').unique().notNullable();
    table.string('text');
    table.specificType('attachments', 'json ARRAY');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('post');
}
