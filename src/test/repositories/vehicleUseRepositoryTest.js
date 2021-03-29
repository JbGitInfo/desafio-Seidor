'use strict';

const { VehicleUseRepository, VehicleRepository, DriverRepository } = require('../../repositories');
const Database = require('../../db');

let idCreate = 0;
describe('VehicleUseRepository Suit Tests', () => {

    const repository = new VehicleUseRepository();
    const vehicleRepo = new VehicleRepository();
    const driverRepo = new DriverRepository();
    const db = new Database();

    beforeEach(async () => await db.start());

    it.only('create', async () => {
        idCreate = await repository.create({
            idDriver: 5,
            idVehicle: 1,
            dataInicio: '2021-03-27',
            dataFim: '2021-04-27',
            useReason: 'Viagem de Família',
            user: 'João Brasil'
        })
        console.log(idCreate)
    });

    it.only('find', async () => {
        let result = await repository.find({
            driver: { id: 1 }
        });
        console.log(JSON.stringify(result));
    })

    it.only('update', async () => {
        const vehicle = await vehicleRepo.findByID(1);
        const driver = await driverRepo.findByID(5);
        await repository.update(idCreate, { driver: vehicle, vehicle: driver, dataInicio: '2021-03-30', dataFim: '2021-04-30', useReason: 'Em manutenção', user: 'Usuário Teste' });
    })

    it.only('findByID', async () => {
        let result = await repository.findByID(idCreate);
        console.log(JSON.stringify(result));
    });


    it.only('delete', async () => {
        await repository.delete(idCreate)
    });
})