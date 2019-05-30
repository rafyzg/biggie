const faker = require("faker");
const { models, initDb } = require("..");

const groupFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const name = faker.commerce.productName();
    await models.group.create({
      name,
      kind: "FOLDER"
    });
  }
};

module.exports = {
  groupFactory
};
