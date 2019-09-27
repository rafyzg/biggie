const Sequelize = require('sequelize');
const { setupLocalDb } = require("./setup");
const { models,initDb,getSequelize } = require('./');
async function syncDb() {
    await initDb();
    const sequelize = getSequelize();
    sequelize.sync();
}

syncDb();


