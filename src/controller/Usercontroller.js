const connection = require('../database/connection');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');



module.exports = {

    async create(req, res){
        const { name, login, userpassword} = req.body;
       
        const id = crypto.randomBytes(4).toString('HEX');
        
        //verify if alreadyyyyexists a user
        const existsUser = await connection('user')
        .where('login', login).select('*');
        
  
        if(!(Array.isArray(existsUser) && existsUser.length)){

            console.log(userpassword);
            
            if(userpassword){
                console.log('entroy');
                const password = await bcrypt.hash(userpassword, 10);
                await connection('user').insert({
                    id,
                    name,
                    login,
                    password,
                    
                });
                
                return res.json({ id });
            }

        }else{
            res.status(401).send();
        }
    },

    async index(req, res){
        
        const { page = 1} = req.query;

        const [count] = await connection('user').count();

        console.log(count);

        const users = await connection('user').select("*");

        return res.json(users);
    },

    async getById(req, res){

        const { id } = req.params

        const user = await connection('user')
        .where('id', id).select('*');

        return res.json(user);
        

    },

    async getByUserName(username){

        const user = await connection('user')
        .where('login', username).select('*');

        return res.json(user);
        

    }

}