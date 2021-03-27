'use strict';

const dateFormat = require('dateformat');

const VehicleRepository = require('../repositories/vehicleRepository');

const { NotFoundException } = require('../exceptions');

module.exports = class VehicleService {
    #vehicleRepo = new VehicleRepository();

    async find(params) {
        const result = await this.#vehicleRepo.find({
            cor: params.cor,
            marca: params.marca,
            user: params.user,
            page: params.page,
            limit: params.limit
        });
        return {
            totalCount: result.totalCount,
            totalPage: result.totalPage,
            results: result.results.map(item => this._mapReturn(item))
        }
    }

    async findByID(id) {
        const result = await this.#vehicleRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw vehicle not found');

        const vehicle = this._mapReturn(result);
        return vehicle;
    }

    async create(obj) {
        const resourceID = await this.#vehicleRepo.create({
            placa: obj.placa,
            cor: obj.cor,
            marca: obj.marca,
            user: obj.user
        });
        return { id: resourceID };
    }

    async delete(id) {
        const result = await this.#vehicleRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw vehicle not found');

        await this.#vehicleRepo.delete(id);
        return 'Raw vehicle successfully deleted';
    }

    async update(id, obj) {
        const driver = await this.#vehicleRepo.findByID(id);
        if (!driver) throw new NotFoundException('Raw vehicle not found');

        driver.placa = obj.placa;
        driver.cor = obj.cor;
        driver.marca = obj.marca;
        driver.user = obj.user;
        await this.#vehicleRepo.update(id, driver);
        return 'Updated successfully';
    }

    _mapReturn(vehicle) {
        return {
            id: vehicle.id,
            placa: vehicle.placa,
            cor: vehicle.cor,
            marca: vehicle.marca,
            user: vehicle.user,
            createdDate: dateFormat(vehicle.createdDate, 'yyyy-mm-dd')
        };
    }
}