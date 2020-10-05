const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {

    async create(req, res){
        const { name, surname, id_party} = req.body;
       
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('member').insert({
            id,
            name,
            surname,
            id_party,
            
        });

        return res.json({ id });
    },

    async index(req, res){
        
        const { page = 1} = req.query;

        const [count] = await connection('member').count();

        console.log(count);

        const incidents = await connection('member').select("*");

        return res.json(incidents);
    },


    
    async removeById(req, res){
        
        const { id } = req.params;

        await connection('member')
                .where('id', id)
                .del();

        return res.status(204).send();
    },

}