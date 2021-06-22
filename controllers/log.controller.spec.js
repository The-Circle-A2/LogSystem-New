const chai = require('chai')
const expect = chai.expect

const Log = require('../models/log.model');
const requester = require('../requester.spec')

describe('log endpoints', function() {

    describe('integration tests', function() {

        it('(POST /api/log) with valid signature should create a log', async function() {
            const testLog = {
                message: 'log message over http',
                signature: 'P+tW7Nd4t4T9QogKdXrGpOEuiwHbu/Biu8WHYUNompemz6cwo5y3gJbY0ln/AJx5Muv9oyqfKAboD9pHZqtPc1HdmprWsdUjZQS4to0wMnRKBolBezQA5jRc/tMsOAgJL+ttWupnG9PmHJ8GRI+gENkWum2+Do/869yjbA+P2i5fGRCXYQjD6jvdsMd23DVzS0MUcvO9kj8paG6P5iFlvco6PhApJhg5KpLDTvaKBhYWeluxlbWpuszxSiQVN+xMEc13mm8pSxGxTaMa06LMSJx8Kbv1Rhbf9y60yj3zvmCtvhu9vkWi6YKeE8bGxHdNUrO4UDcXB36721jA0NoCGg'
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