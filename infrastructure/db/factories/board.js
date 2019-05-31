const faker = require("faker");
const { models, initDb } = require("..");

const boardFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const label = faker.commerce.productName();
    const groupId = faker.random.number(await models.board.count());
      await models.board.create({
      label,
      groupId
    });
  }
};

module.exports = {
  boardFactory
};
