import Database from 'better-sqlite3-multiple-ciphers';
import {PrismaClient} from '../generated/prisma/index.js';
import {PrismaGenericBetterSQLite3} from '../index.js';

const database = new Database('./dev.db');
database.pragma("key='secret-key'");

export const prismaClient = new PrismaClient({
    adapter: new PrismaGenericBetterSQLite3({
        database,
    }),
});
