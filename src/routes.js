const express = require('express');
const Joi = require('joi');
const authorize = require('./middleware/Authorize');

const routes = express.Router();

const partyController = require('./controller/partyController');
const memberController = require('./controller/memberController');
const userController = require('./controller/Usercontroller');
const authenticateController = require('./controller/authenticationController');



routes.get('/', (req, res) => {
    console.log(`Server started on port`);
    });

routes.post('/authenticate', authenticateController.authenticate);

routes.post('/party', partyController.create);
routes.get('/party', partyController.index);
routes.delete('/party/:id',  partyController.removeById);

routes.get('/member', memberController.index)
routes.post('/member',  memberController.create);
routes.delete('/member/:id',  memberController.removeById);

routes.post('/user', userController.create);
//routes.get('/user',  authorize(), userController.index);

module.exports = routes;