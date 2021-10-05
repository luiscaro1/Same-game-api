import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Lobby', (table) => {
    table.uuid('lid').unique().notNullable();
    table.string('description').notNullable();
    table.specificType('members', 'text ARRAY').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('Lobby');
}
