'use strict';

const dateFormat = require('dateformat');

const DriverRepository = require('../repositories/driverRepository');

const { NotFoundException } = require('../exceptions');

module.exports = class DriverService {
    #driverRepo = new DriverRepository();

    async find(params) {
        const result = await this.#driverRepo.find({
            nome: params.nome,
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
        const result = await this.#driverRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw driver not found');

        const driver = this._mapReturn(result);
        return driver;
    }

    async create(obj) {
        const resourceID = await this.#driverRepo.create({
            nome: obj.placa,
            user: obj.user
        });
        return { id: resourceID };
    }

    async delete(id) {
        const result = await this.#driverRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw driver not found');

        await this.#driverRepo.delete(id);
        return 'Raw driver successfully deleted';
    }

    async update(id, obj) {
        const driver = await this.#driverRepo.findByID(id);
        if (!driver) throw new NotFoundException('Raw driver not found');

        driver.nome = obj.nome;
        driver.user = obj.user;
        await this.#driverRepo.update(id, driver);
        return 'Updated successfully';
    }

    _mapReturn(driver) {
        return {
            id: driver.id,
            nome: driver.nome,
            user: vehicle.user,
            createdDate: dateFormat(vehicle.createdDate, 'yyyy-mm-dd')
        }
    }
}