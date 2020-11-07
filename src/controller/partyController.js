const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {

    async create(req, res){
        const { name, no, legenda} = req.body;
       
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('party').insert({
            id,
            name,
            no,
            legenda,
            
        });

        return res.json({ id });
    },

    async index(req, res){
        
        const { page = 1} = req.query;

        const [count] = await connection('party').count();

        console.log(count);

        const incidents = await connection('party').select("*");

        return res.json(incidents);
    },


    
    async removeById(req, res){
        
        const { id } = req.params;

        await connection('party')
                .where('id', id)
                .del();

        return res.status(204).send();
    },

}