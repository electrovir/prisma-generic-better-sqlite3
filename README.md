# prisma-generic-better-sqlite3

This is a [`better-sqlite3`](https://www.npmjs.com/package/better-sqlite3) database driver for [Prisma](https://www.npmjs.com/package/prisma) that accepts a user defined `better-sqlite3` [`Database`](https://github.com/WiseLibs/better-sqlite3/blob/335ccad4f0d24d4377eed1118bea5daec0b61647/docs/api.md#class-database#class-database) instance. This a more flexible version of [`@prisma/adapter-better-sqlite3`](https://www.npmjs.com/package/@prisma/adapter-better-sqlite3).

You can construct and pass in _any_ object that is compatible with `better-sqlite3`'s `Database` class. This enables, for example, using an encrypted SQLite database via [`better-sqlite3-multiple-ciphers`](https://www.npmjs.com/package/better-sqlite3-multiple-ciphers).

## Install

```sh
npm i prisma-generic-better-sqlite3
```

## Usage

### Prisma Schema

-   enable the `driverAdapters` preview feature
-   set your datasource to `sqlite`

```prisma
// schema.prisma
generator client {
    provider        = "prisma-client-js"
    previewFeatures = ["driverAdapters"]
    output          = "./generated/prisma"
}

datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
}
```

### Prisma Client

1. Construct your `Database` instance.
2. Use it to construct a `PrismaGenericBetterSQLite3` instance.
3. Pass that into `PrismaClient`'s `adapter` parameter.

-   Using `better-sqlite3` directly (though you might as well just use [@prisma/adapter-better-sqlite3](https://www.npmjs.com/package/@prisma/adapter-better-sqlite3) in this case):
    <!-- example-link: src/readme-examples/better-sqlite3.example.ts -->

    ```TypeScript
    import Database from 'better-sqlite3';
    import {PrismaClient} from '../generated/prisma/index.js';
    import {PrismaGenericBetterSQLite3} from 'prisma-generic-better-sqlite3';

    export const prismaClient = new PrismaClient({
        adapter: new PrismaGenericBetterSQLite3({
            database: new Database('./dev.db'),
        }),
    });
    ```

-   Using [`better-sqlite3-multiple-ciphers`](https://www.npmjs.com/package/better-sqlite3-multiple-ciphers):
    <!-- example-link: src/readme-examples/better-sqlite3-multiple-ciphers.example.ts -->

    ```TypeScript
    import Database from 'better-sqlite3-multiple-ciphers';
    import {PrismaClient} from '../generated/prisma/index.js';
    import {PrismaGenericBetterSQLite3} from 'prisma-generic-better-sqlite3';

    const database = new Database('./dev.db');
    database.pragma("key='secret-key'");

    export const prismaClient = new PrismaClient({
        adapter: new PrismaGenericBetterSQLite3({
            database,
        }),
    });
    ```
