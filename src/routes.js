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

routes.post('/party', authorize(),  partyController.create);
routes.get('/party', authorize(),  partyController.index);

routes.get('/member', authorize(), memberController.index)
routes.post('/member', authorize(),  memberController.create);
routes.delete('/member/:id', authorize(),  memberController.removeById);

routes.post('/user', userController.create);
//routes.get('/user',  authorize(), userController.index);

module.exports = routes;