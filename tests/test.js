let chai = require('chai');
let assert = require('assert');
const connection = process.env.DATABASE_URL || 'postgres://admin:12345@localhost:5432/monday';
let knex = require('knex')({
    client: 'pg',
    connection,
    pool: { min: 0, max: 200 }
});

describe('Database testing', () => {
  describe('#check all tables exist()', () => {
    beforeEach(() => { 
        //Before each test run this
    });

    it('should return true - table boards exist', (done) => {
        knex.schema.hasTable('boards').then((exists) => {
            assert.equal(exists, true);
            done();
        });
    });

    it('should return true - table groups exist', (done) => {
        knex.schema.hasTable('groups').then((exists) => {
            assert.equal(exists, true);
            done();
        });
    });

    it('should return true - table teammembers exist', (done) => {
        knex.schema.hasTable('teammembers').then((exists) => {
            assert.equal(exists, true);
            done();
        });
    });

    //Checks if deafult user exists in database
    it('should return true - admin user exists', (done) => {
        knex.select('emailAddress').from('teammembers').where('emailAddress', 'factoryMember@gmail.com').then((exists) => {
            chai.expect(exists).to.be.an('array');
            chai.expect(exists.length).to.be.above(0);
            //assert.equal(exists.length, > 0);
            done();
        });
    });
  });
});
