'use strict';

const VehicleRepository = require('../../repositories/vehicleRepository');
const Database = require('../../db');

let idCreate = 0;
describe('DriverRepository Suit Tests', () => {

    const repository = new VehicleRepository();
    const db = new Database();

    beforeEach(async () => await db.start());

    it.skip('create', async () => {
        idCreate = await repository.create({
            placa: 'ZZZ-0000',
            cor: 'Cinza',
            marca: 'Fiat',
            user: 'Usuário Teste'
        })
        console.log(idCreate)
    });

    it.skip('find', async () => {
        let result = await repository.find({
            cor: "Cinza"
        });
        console.log(JSON.stringify(result));
    })

    it.skip('update', async () => {
        await repository.update(idCreate, { placa: 'ZZZ-1111', cor: 'Preto', marca: 'Bmw', user: 'Usuário Novo Teste' });
    })

    it.skip('findByID', async () => {
        let result = await repository.findByID(idCreate);
        console.log(JSON.stringify(result));
    });


    it.skip('delete', async () => {
        await repository.delete(idCreate)
    });
})