'use strict';

const DriverModel = require('../models/driverModel');

module.exports = class DriverRepository {
    #model = DriverModel;

    /**
     * 
     * @param {{nome:String,user:String}} params
     * @returns {[{id:Number,nome:String,user:String}]}>}
     */
    async find(params) {
        const optionsFilter = {};
        if (params.nome) optionsFilter.nome = params.nome;
        if (params.user) optionsFilter.user = params.user;

        const result = await this.#model.find(optionsFilter);

        return result.map(item => {
            return {
                id: item.id,
                nome: item.nome,
                user: item.user,
                createDate: item.createDate
            };
        });
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Promise<{nome:String,user:String}>}
     */
    async findByID(id) {
        const result = await this.#model.findOne({ id });
        if (!result) return null;

        return {
            id: result.id,
            nome: result.nome,
            user: result.user
        };
    }

    /**
    * 
    * @param {{ nome:String,user:String }} obj 
    * @returns {Promise<Number>}
    */
    async create(obj) {
        const result = await this.#model.create(obj);
        return result.id;
    }

    /**
     * 
     * @param {Number} id 
     *  @param {{ nome:string,user:string }} obj  
     * @return {Promise<void>}
     */
    async update(id, obj) {
        await this.#model.updateOne({ id: id }, obj);
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Promise<void>}
     */
    async delete(id) {
        await this.#model.deleteOne({ id });
    }
}