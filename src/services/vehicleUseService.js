'use strict';

const dateFormat = require('dateformat');

const { VehicleUseRepository, VehicleRepository, DriverRepository } = require('../repositories');

const { NotFoundException, UnprocessableEntityException } = require('../exceptions');

module.exports = class VehicleUseService {
    #vehicleUseRepo = new VehicleUseRepository();
    #vehicleRepo = new VehicleRepository();
    #driverRepo = new DriverRepository();

    async find(params) {
        const result = await this.#vehicleUseRepo.find({
            idDriver: params.idDriver,
            idVehicle: params.idVehicle,
            user: params.user
        });
        return result.map(item => this._mapReturn(item))

    }

    async findByID(id) {

        const result = await this.#vehicleUseRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw vehicleUse not found');

        const vehicleUse = this._mapReturn(result);
        return vehicleUse;
    }

    async create(obj) {
        await this._ValidadeVehicleUse(obj);

        const vehicle = await this.#vehicleRepo.findByID(obj.idVehicle);
        const driver = await this.#driverRepo.findByID(obj.idDriver);
        const resourceID = await this.#vehicleUseRepo.create({
            driver: driver,
            vehicle: vehicle,
            dataInicio: obj.dataInicio,
            dataFim: obj.dataFim,
            useReason: obj.useReason,
            user: obj.user
        });
        return { id: resourceID };
    }

    async delete(id) {
        const result = await this.#vehicleUseRepo.findByID(id);
        if (!result) throw new NotFoundException('Raw vehicle not found');

        await this.#vehicleUseRepo.delete(id);
        return 'Raw vehicle successfully deleted';
    }

    async update(id, obj) {
        await this._ValidadeVehicleUse(obj);

        const vehicleUse = await this.#vehicleUseRepo.findByID(id);
        const vehicle = await this.#vehicleRepo.findByID(obj.idVehicle);
        const driver = await this.#driverRepo.findByID(obj.idDriver);

        vehicleUse.driver = driver;
        vehicleUse.vehicle = vehicle;
        vehicleUse.dataInicio = obj.dataInicio;
        vehicleUse.dataFim = obj.dataFim;
        vehicleUse.useReason = obj.useReason;
        vehicleUse.user = obj.user;

        await this.#vehicleUseRepo.update(id, vehicleUse);
        return 'Updated successfully';
    }

    _mapReturn(vehicleUse) {
        return {
            id: vehicleUse.id,
            driver: vehicleUse.driver,
            vehicle: vehicleUse.vehicle,
            dataInicio: dateFormat(vehicleUse.dataInicio, 'yyyy-mm-dd'),
            dataFim: dateFormat(vehicleUse.dataFim, 'yyyy-mm-dd'),
            useReason: vehicleUse.useReason,
            user: vehicleUse.user,
            createdDate: dateFormat(vehicleUse.createdDate, 'yyyy-mm-dd')
        };
    }
    async _ValidadeVehicleUse(vehicleUse) {
        if (!await this.#vehicleRepo.findByID(vehicleUse.idVehicle)) throw new UnprocessableEntityException('Vehicle not found');
        if (!await this.#driverRepo.findByID(vehicleUse.idDriver)) throw new UnprocessableEntityException('Driver not found');
    }
}
