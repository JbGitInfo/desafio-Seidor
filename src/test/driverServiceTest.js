'use strict';

const DriverService = require('../services/driverService');
const Database = require('../db');

describe('DriverService Suit Tests', () => {

    const service = new DriverService();
    const db = new Database();

    beforeEach(async () => await db.start());

    it.skip('getDrivers', async () => await service.find());

    it.skip('postDriver', async () => await service.create({
        nome: 'João Brasil',
        user: 'João Brasil'
    }));

    it.skip('getDriver', async () => await service.findByID(1));

    it.skip('deleteDriver', async () => await service.delete(1));

    it.skip('updateDriver', async () => await service.update(
        5,
        {
            nome: 'Edmara Dias',
            user: 'Edmara'
        }));
})