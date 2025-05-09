import sqlite, {type Database} from 'better-sqlite3-multiple-ciphers';
import {existsSync} from 'node:fs';

const databaseEncryptionSecret = 'secret key goes here';

const initQueries = [
    `
        CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL
        );
    `,
    `INSERT INTO user (email, username) VALUES ('test@example.com', 'test');`,
];
export const testQuery = `SELECT * FROM user WHERE id = 1;`;
export const testUser = {
    id: 1,
    username: 'test',
    email: 'test@example.com',
} as const;

export function connectToDatabase(filePath: string): Database {
    initDatabase(filePath);

    const database = sqlite(filePath, {});
    database.pragma(`key='${databaseEncryptionSecret}'`);

    return database;
}

export function initDatabase(filePath: string) {
    if (existsSync(filePath)) {
        return;
    }
    const database = sqlite(filePath, {});
    database.pragma('journal_mode = WAL');
    database.pragma(`rekey='${databaseEncryptionSecret}'`);
    database.transaction(() => {
        initQueries.forEach((query) => {
            try {
                database.prepare(query).run();
            } catch (error) {
                console.error(`Failed on ${query}`);
                throw error;
            }
        });
    })();

    database.close();
}
