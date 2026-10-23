import * as migration_20261023_150210_initial from './20261023_150210_initial';
import * as migration_20261023_152214_blob_storage_fields from './20261023_152214_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261023_150210_initial.up,
    down: migration_20261023_150210_initial.down,
    name: '20261023_150210_initial',
  },
  {
    up: migration_20261023_152214_blob_storage_fields.up,
    down: migration_20261023_152214_blob_storage_fields.down,
    name: '20261023_152214_blob_storage_fields'
  },
];
