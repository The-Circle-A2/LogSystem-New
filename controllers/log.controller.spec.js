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
                signature: 'jhczV+XRAPBnTKnY4CfkQARejTPbRagYVO2YpLXjqK5x8hKyCxO16nIj2fJpAEAbcZjWj9Vzgbmy3Qiz3mwKFREq5r7I5KWZY/ZHzX8G74B2qyQCFgobcpIF5/cXjmK0BTKe1LA5WdK74b5AsqiiN0uXdtYBkW8B40bFMNTZbh1uPzxay5f7Ts5FUkno881WF4Dxf1Wu63R6P8WFotqbwMDMEPStWTPRq8nb3ngRlO9ipCc2AnHJlYZnG3wPMuqLjf40zUhSLrfKpCp2fq4wu+Zm0v/ecWHFXM5ZhSzMXohNg/th/3KofzO/UqIEAOVix8xoDfMtzZaxUKHGZdS/Jw'
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