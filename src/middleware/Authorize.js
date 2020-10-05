const jwt = require('express-jwt');
const { secret } = require('../../jwt-config.json');
const connection = require('../database/connection');

module.exports = authorize;

function authorize(req, res, next){
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            console.log(req.user);
            const user = await connection('user').where('id', req.user.sub);


            // check user still exists
            if (user.length <= 0)
                return res.status(401).json({ message: 'Unauthorized' });

            // authorization successful
            req.user = user;
            next();
        }
    ];
}