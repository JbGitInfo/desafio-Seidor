'use strict';

const DriverRepository = require('../../repositories/driverRepository');
const Database = require('../../db');

let idCreate = 0;
describe('DriverRepository Suit Tests', () => {

    const repository = new DriverRepository();
    const db = new Database();


    beforeEach(async () => await db.start());

    it.only('create', async () => {
        idCreate = await repository.create({
            nome: 'Motorista Teste',
            user: 'Usuário Teste'
        });
        console.log(idCreate);
    });

    it.skip('find', async () => {
        let result = await repository.find({
            name: "Motorista Teste"
        })
        console.log(JSON.stringify(result));
    })

    it.skip('update', async () => {
        await repository.update(idCreate, { nome: 'Motorista Novo Teste', user: 'Usuário Novo Teste' });
    })

    it.skip('findByID', async () => {
        let result = await repository.findByID(idCreate);
        console.log(JSON.stringify(result));
    });


    it.skip('delete', async () => {
        await repository.delete(idCreate);
    });
})