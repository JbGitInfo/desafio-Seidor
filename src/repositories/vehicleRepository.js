'use strict';

const VehicleModel = require('../models/vehicleModel');

module.exports = class VehicleRepository {
    #model = VehicleModel;

    /**
     * 
     * @param {{cor:String,marca:String,user:String,page:Number,limit:Number}} params
     * @returns {Promise<{totalCount:Number,totalPage:Number, results:[{id:Number,placa:String,cor:String,marca:String,user:String}]}>}
     */
    async find(params) {
        const optionsFilter = {};
        if (params.cor) optionsFilter.cor = params.cor;
        if (params.marca) optionsFilter.marca = params.marca;
        if (params.user) optionsFilter.user = params.user;

        const result = await this.#model.paginate(optionsFilter, {
            page: params.page || 1,
            limit: params.limit || 10
        });

        return {
            totalCount: result.totalDocs,
            totalPage: result.totalPages,
            results: result.docs.map(item => {
                return {
                    id: item.id,
                    placa: item.placa,
                    cor: item.cor,
                    marca: item.marca,
                    user: item.user,
                    createDate: item.createDate
                }
            })
        }
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
    * @param {{ placa:String,cor:String,marca:String,user:String }} obj 
    * @returns {Promise<Number>}
    */
    async create(obj) {
        const result = await this.#model.create(obj);
        return result.id;
    }

    /**
     * 
     * @param {Number} id 
     *  @param {{ placa:string,cor:String,marca:String,user:string }} obj 
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