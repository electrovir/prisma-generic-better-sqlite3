import {mkdir} from 'node:fs/promises';
import {join, resolve} from 'node:path';

export const repoDirPath = resolve(import.meta.dirname, '..');
export const notCommittedDirPath = join(repoDirPath, '.not-committed');
export const databaseFilePath = join(notCommittedDirPath, 'test.db');

await mkdir(notCommittedDirPath, {recursive: true});
