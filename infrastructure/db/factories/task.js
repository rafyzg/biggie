const faker = require("faker");
const { models, initDb } = require("..");

const taskFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const label = faker.commerce.productName();
    const ownerId = faker.random.number(await models.teammember.count());
    const groupId = faker.random.number(await models.group.count());
    const boardId = faker.random.number(await models.board.count());
    const status = faker.random.arrayElement(["done", "waiting"]);
    await models.task.create({
      label,
      ownerId,
      groupId,
      boardId,
      status,
      metadata: {test: "done"},
    });
  }
};

module.exports = {
  taskFactory
};
