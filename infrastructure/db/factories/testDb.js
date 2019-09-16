const faker = require("faker");
const { models, initDb } = require("..");

const testDatabase = async () => {
  await initDb();
  const member = await models.teammember.create({ emailAddress : faker.internet.email(), password : faker.internet.password() });
  const board = await models.board.create({label : 'FactoryBoard'});
  //board.setTeammembers(member, {});
  //member.addBoard(board, {});
  //only use one of them. they do the same => add relation to the pivot table
  const group = await models.group.create({ label : 'groupFactory', boardId: board.id });
  await models.task.create({ label : 'taskFactory', status : 'unfinished',
    metadata : {}, groupId: group.id, teammemberId: user.id, teammeberId: member.id });
};

testDatabase();

module.exports = {
  testDatabase
};