const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../jwt-config.json');


module.exports = {
    
    async authenticate(req, res){
        const { username, password} = req.body;
       
        const user = await connection('user')
        .where('login', username).select('*');

        if(user.length <= 0 && !(await bcrypt.compare(password, user.password))){
            throw 'Username or password is incorrect';
        }

        console.log(user);

        // authentication successful
        const token = jwt.sign({ sub: user[0].id }, secret, { expiresIn: '7d' });
        const returnedUser =  { ...omitPassword(user[0]), token };

        return res.json(returnedUser);

    },

    

}

function omitPassword(user) {
    const { password, ...userWithoutHash } = user;
    return userWithoutHash;
}