import Database from 'better-sqlite3';
import {PrismaClient} from '../generated/prisma/index.js';
import {PrismaGenericBetterSQLite3} from '../index.js';

export const prismaClient = new PrismaClient({
    adapter: new PrismaGenericBetterSQLite3({
        database: new Database('./dev.db'),
    }),
});
