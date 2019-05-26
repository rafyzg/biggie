const faker = require("faker");
const { models, initDb } = require("..");

const boardFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const label = faker.commerce.productName();
    //const groups = await models.group.findAll();
    await models.board.create({
      label,
      groupId: 1,
    });
  }
};

module.exports = {
  boardFactory
};
