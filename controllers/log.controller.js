const Log = require('../models/log.model');

module.exports = {

    async create (req, res, next) {
        const entity = new Log(req.body)
        await entity.save()
        .catch(next);
        res.status(201).json({_id: entity.id})
    },

};