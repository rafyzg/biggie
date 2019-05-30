const faker = require("faker");
const { models, initDb } = require("..");

const taskFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const label = faker.commerce.productName();
    await models.task.create({
      label,
      ownerId: 1,
      groupId: 1,
      boardId: 1,
      status: "done",
      metadata: {test: "done"},
    });
  }
};
module.exports = {
  taskFactory
};
