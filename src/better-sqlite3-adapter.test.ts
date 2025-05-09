import {assert} from '@augment-vir/assert';
import {describe, it} from '@augment-vir/test';
import {connectToDatabase, initDatabase, testUser} from './better-sqlite3.mock.js';
import {PrismaClient} from './generated/prisma/index.js';
import {PrismaGenericBetterSQLite3} from './index.js';
import {databaseFilePath} from './repo-paths.mock.js';

export function createPrismaClient() {
    initDatabase(databaseFilePath);

    const adapter = new PrismaGenericBetterSQLite3({
        database: connectToDatabase(databaseFilePath),
    });
    const prismaClient = new PrismaClient({adapter});

    return prismaClient;
}

describe('prisma', () => {
    it('can read an encrypted database', async () => {
        const prismaClient = createPrismaClient();

        assert.deepEquals(
            await prismaClient.user.findFirst({
                where: {
                    id: 1,
                },
            }),
            testUser,
        );
    });
});
