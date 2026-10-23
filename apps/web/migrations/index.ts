import * as migration_20261023_150210_initial from './20261023_150210_initial';

export const migrations = [
  {
    up: migration_20261023_150210_initial.up,
    down: migration_20261023_150210_initial.down,
    name: '20261023_150210_initial'
  },
];
