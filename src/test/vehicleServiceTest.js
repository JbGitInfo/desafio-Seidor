'use strict';

const VehicleService = require('../services/vehicleService');
const Database = require('../db');

describe('VehicleService Suit Tests', () => {

    const service = new VehicleService();
    const db = new Database();

    beforeEach(async () => await db.start());

    it.skip('getVehicles', async () => await service.find());

    it.skip('postVehicle', async () => await service.create({
        placa: 'PUE-3484',
        cor: 'Branco',
        marca: 'Renault',
        user: 'João Brasil'
    }));

    it.skip('getVehicle', async () => await service.findByID(1));

    it.skip('deleteVehicle', async () => await service.delete(1));

    it.skip('updateVehicle', async () => await service.update(
        5,
        {
            placa: 'PUE-3485',
            cor: 'Preto',
            marca: 'Fiat',
            user: 'João'
        }));
})