const chai = require('chai')
const expect = chai.expect

const Log = require('../models/log.model');
const requester = require('../requester.spec')

describe('log endpoints', function() {

    describe('integration tests', function() {

        it('(POST /api/log) with valid signature should create a log', async function() {
            const testLog = {
                message: 'log message over http',
                timestamp: 'time',
                signature: 'g51vYzuJesVckBBYkagcJ+KiWvaEf/5wnORpljq6hTzJv0x9kOJgQL1WmcPQC0zl8+1ZbR2REtjdTioKxxCbFTG4YP++hIim9DwnkxFdHR/fZif17zsFNIt540JNYzBkk5VpRz3wvKrd5gFHxNUT4Ha4o9DaohhCkhi4+uR4Q0Z+V6HK7HcPfLv2Wf9kGwK1i/QRRj7FDmJFNSSpxJRqEIRkY/CYXtpdJOczMzNp9J0baYdg0hUEUilrBImmDTTTfRmhsPzzlas2sG5w8M0vhY0LV0FduDK/WXq+nl+s+ZVkMP7Ox4BpLT9mWgsbXSMy0zmlNLMkshrKG/LMjsowYA'
            };

            const res = await requester.post('/api/log').send(testLog);

            expect(res).to.have.status(201);
    
            const inserted = await Log.findOne({message: testLog.message});
            expect(inserted).to.have.property('message', testLog.message);
            expect(inserted).to.have.property('userName', testLog.userName);
            expect(inserted).to.have.property('time');

        });

        it('(POST /api/log) with invalid signature should return code 409', async function() {
            const testLog = {
                message: 'log message over http',
                signature: 'invalid'
            };

            const res = await requester.post('/api/log').send(testLog);

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message');

            const inserted = await Log.findOne({message: testLog.message});
            expect(inserted).to.be.null;

        });

        it('(POST /api/log) without a signature should return code 409', async function() {
            const testLog = {
                message: 'log message over http'
            };

            const res = await requester.post('/api/log').send(testLog);

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message');

            const inserted = await Log.findOne({message: testLog.message});
            expect(inserted).to.be.null;

        });

        it('(POST /api/log) without a message should return code 409', async function() {
            const testLog = {
                userName: 'username'
            };

            const res = await requester.post('/api/log').send(testLog);

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message');

            const inserted = await Log.findOne({userName: testLog.userName});
            expect(inserted).to.be.null;

        });

    });

});