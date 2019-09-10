const faker = require("faker");
const { models, initDb } = require("..");

const testDatabase = async () => {
  await initDb();

  //const board = models.board;
  //const group = models.group;

  models.teammember.create({ emailAddress : faker.internet.email(), password : faker.internet.password() }).then(user => {
    models.board.create({label : 'FactoryBoard'}).then(board => {
      //board.setTeammembers(user, {});
      //user.addBoard(board, {});
      //only use one of them. they do the same => add relation to the pivot table
      models.group.create({ label : 'groupFactory', boardId: board.id}).then(group => {
        models.task.create({ label : 'taskFactory', status : 'unfinished', metadata : {}, groupId: group.id, teammemberId: user.id, teammeberId: user.id })
      });
    });
  });
  
  
  /*const groupRow = models.group.build({ label : 'first Group', board : { label : 'secBoard'} },
  {
    include : [{
      association : group.board
    }]
  });*/
};

testTable();

module.exports = {
  testTable
};
