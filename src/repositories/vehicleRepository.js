'use strict';

const VehicleModel = require('../models/vehicleModel');

module.exports = class VehicleRepository {
    #model = VehicleModel;

    /**
     * 
     * @param {{cor:String,marca:String,user:String}} params
     * @returns {Promise<{[{id:Number,placa:String,cor:String,marca:String,user:String}]}>}
     */
    async find(params) {
        const optionsFilter = {};
        if (params.cor) optionsFilter.cor = params.cor;
        if (params.marca) optionsFilter.marca = params.marca;
        if (params.user) optionsFilter.user = params.user;

        const result = await this.#model.find(optionsFilter);
        return result.map(item => {
            return {
                id: item.id,
                placa: item.placa,
                cor: item.cor,
                marca: item.marca,
                user: item.user
            };
        });
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Promise<{placa:String,cor:String,marca:String,user:String}>}
     */
    async findByID(id) {
        const result = await this.#model.findOne({ id });
        if (!result) return null;

        return {
            id: result.id,
            placa: result.placa,
            cor: result.cor,
            marca: result.marca,
            user: result.user
        };
    }

    /**
    * 
    * @param {{ motorista:String,placa:String,cor:String,marca:String,dataInicio:Date,dataFim:Date,useReason:String,user:String }} obj 
    * @returns {Promise<Number>}
    */
    async create(obj) {
        const result = await this.#model.create(obj);
        return result.id;
    }

    /**
     * 
     * @param {Number} id 
     *  @param {{ motorista:String,placa:String,cor:String,marca:String,dataInicio:Date,dataFim:Date,useReason:String,user:String }} obj 
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