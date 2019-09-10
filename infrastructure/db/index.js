const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { setupLocalDb } = require("./setup");

const models = {};
let sequelize;

// Sequelize init function
const init = databaseUrl => {
  /*const opts = {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    };*/

  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false
    //define: opts
  });

  fs.readdirSync(path.join(__dirname, "models"))
    .filter(file => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, "models", file));
      models[model.name] = model;
    });

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

// Init quickly if we're testing or developing
if (!sequelize && ["test", "development"].includes(process.env.NODE_ENV)) {
  init(setupLocalDb());
}

// NOTE: Init should be called by each server entry point
/* eslint-disable no-console */
const initDb = async () => {
  // Initialize only once
  if (sequelize) return;

  // TODO: test if we can use belogger instead of console logging
  // Initialize according to env
  console.log("Initializing Sequelize");
  const settings = await setupLocalDb();
  init(settings);
  console.log("Sequelize is ready");
};
/* eslint-enable no-console */

const getSequelize = () => sequelize;

module.exports = { initDb, models, getSequelize };
