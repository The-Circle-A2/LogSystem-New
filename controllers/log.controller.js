const Log = require('../models/log.model');
const { verifyLog, signResponse } = require('../utils/rsaIntegrityHandler');

module.exports = {

    async create (req, res, next) {
        const entity = new Log(req.body);

        if(verifyLog(req.body)){
            await entity.save()
            .catch(next);

            var response = signResponse("verification OK");
            res.status(201).json(response);

        } else {
            var response = signResponse("verification failure");
            res.status(409).json(response);
        }
    }

};
