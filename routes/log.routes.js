const logController = require('../controllers/log.controller');

module.exports = (app) => {

    app.post('/api/log', logController.create);

};