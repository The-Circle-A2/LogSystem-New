const chai = require('chai')
const expect = chai.expect

const Log = require('../models/log.model');
const requester = require('../requester.spec')

describe('log endpoints', function() {

    describe('integration tests', function() {

        it('(POST /api/log) should create a log', async function() {
            const testLog = {
                message: 'Log message',
                userName: 'Username'
            };

            const res = await requester.post('/api/log').send(testLog);

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('_id');
    
            const inserted = await Log.findOne({message: testLog.message});
            expect(inserted).to.have.property('message', testLog.message);
            expect(inserted).to.have.property('userName', testLog.userName);
            expect(inserted).to.have.property('time');

        });

    });

});