import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Game', (table) => {
    table.uuid('gid').unique().notNullable();
    table.string('name').unique().notNullable();
    table.string('released').notNullable();
    table.specificType('platforms', 'TEXT ARRAY');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists('Game');
}
