'use strict';

const VehicleUseService = require('../services/vehicleUseService');
const Database = require('../db');

describe('VehicleUseService Suit Tests', () => {

    const service = new VehicleUseService();
    const db = new Database();

    beforeEach(async () => await db.start());

    it.skip('getVehiclesUse', async () => await service.find());

    it.skip('postVehicleUse', async () => await service.create({
        driver: 1,
        vehicle: 5,
        dataInicio: '2021-03-27',
        dataFim: '2021-04-27',
        useReason: 'Viagem de Família',
        user: 'João Brasil'
    }));

    it.skip('getVehicleUse', async () => await service.findByID(1));

    it.skip('deleteVehicleUse', async () => await service.delete(1));

    it.skip('updateVehicleUse', async () => await service.update(
        1,
        {
            driver: 2,
            vehicle: 6,
            dataInicio: '2021-05-27',
            dataFim: '2021-06-27',
            useReason: 'Em Manutenção',
            user: 'Edmara Dias'
        }));
})