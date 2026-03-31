"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./data-source"));
const _1700000000000_InitialDatabaseSetup_1 = require("./migrations/1700000000000-InitialDatabaseSetup");
const _1700000000001_CreateViews_1 = require("./migrations/1700000000001-CreateViews");
const runMigrations = async () => {
    try {
        console.log('Initializing Data Source...');
        data_source_1.default.setOptions({
            migrations: [_1700000000000_InitialDatabaseSetup_1.InitialDatabaseSetup1700000000000, _1700000000001_CreateViews_1.CreateViews1700000000001]
        });
        await data_source_1.default.initialize();
        console.log('Data Source has been initialized!');
        console.log('Running migrations...');
        await data_source_1.default.runMigrations();
        console.log('Migrations have been run successfully.');
        await data_source_1.default.destroy();
        console.log('Data Source has been destroyed.');
        process.exit(0);
    }
    catch (err) {
        console.error('Error during migration run:', err);
        process.exit(1);
    }
};
runMigrations();
//# sourceMappingURL=run-migrations.js.map