'use strict';

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const DriverModel = require('./driverModel');
const VehicleModel = require('./vehicleModel');

const schema = new mongoose.Schema({
    id: Number,
    driver: DriverModel.schema,
    vehicle: VehicleModel.schema,
    dataInicio: Date,
    dataFim: Date,
    useReason: String,
    user: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    }
});

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, {
    model: 'VehicleUse',
    field: 'id',
    startAt: 1
});

const model = mongoose.model('VehicleUse', schema);

module.exports = model;


