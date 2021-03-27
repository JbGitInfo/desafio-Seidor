'use strict';

const VehicleUseModel = require('../models/vehicleUseModel');

module.exports = class VehicleUseRepository {
    #model = VehicleUseModel;

    /**
     * 
     * @param {{driverId:Number,vehicleId:Number,user:String}} params
     * @returns {Promise<{[{id:Number,driver:{id:Number,nome:String,user:String,createdDate:Date,updatedDate:Date},vehicle:{id:Number,placa:String,cor:String,marca:String,user:String,createdDate:Date,updatedDate:Date},dataInicio:Date,dataFim:Date,useReason:String,user:String}]}>}
     */
    async find(params) {
        const optionsFilter = {};
        if (params.driverId) optionsFilter.driverId = params.driverId;
        if (params.vehicleId) optionsFilter.vehicleId = params.vehicleId;
        if (params.user) optionsFilter.user = params.user;

        const result = await this.#model.find(optionsFilter);

        return result.map(item => {
            return {
                id: item.id,
                driver: item.driver,
                vehicle: item.vehicle,
                dataInicio: item.dataInicio,
                dataFim: item.dataInicio,
                useReason: item.useReason,
                user: item.user,
                createDate: item.createDate
            };
        });
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Promise<{[{driver:Object,vehicle:Object,dataInicio:Date,dataFim:Date,useReason:String,user:String}]}>}
     */
    async findByID(id) {
        const result = await this.#model.findOne({ id });
        if (!result) return null;

        return {
            id: result.id,
            driver: result.driver,
            vehicle: result.vehicle,
            dataInicio: result.dataFim,
            dataFim: result.dataFim,
            useReason: result.useReason,
            user: result.user
        };
    }

    /**
    * 
    * @param {{ idDriver:Number,idVehicle:Number,dataInicio:String,dataFim:String,useReason:String,user:String }} obj 
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