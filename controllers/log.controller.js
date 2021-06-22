const Log = require('../models/log.model');
const { verifyLog, signAck } = require('../utils/rsaIntegrityHandler');

module.exports = {

    async create (req, res, next) {
        const entity = new Log(req.body)
        await entity.save()
        .catch(next);
        res.status(201).json({_id: entity.id})
    },

};