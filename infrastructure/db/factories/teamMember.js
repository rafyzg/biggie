const faker = require("faker");
const { models, initDb } = require("..");

const teamMemberFactory = async instances => {
  await initDb();

  for (let i = 0; i < instances; i++) {
    const emailAddress = faker.internet.email();
    const password = faker.internet.password();
    await models.teammember.create({
      emailAddress,
      password
    });
  }
};

module.exports = {
    teamMemberFactory
};
