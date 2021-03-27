'use strict';

const controller = require('./base');
const constants = require('../utils/constants');
const VehicleService = require('../services/vehicleService');


module.exports = class VehicleController {
    static async getVehicles(req, res) {
        try {
            const service = new VehicleService();
            const result = await service.find(req.query);

            res.set('X-Total-Count', result.totalCount);
            res.set('X-Total-Page', result.totalPage);

            res.status(constants.statusCode.SUCCESS.CODE).send(result.results);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async postVehicle(req, res) {
        try {
            const service = new VehicleService();
            const result = await service.create(req.body);

            res.status(constants.statusCode.CREATED.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async getVehicle(req, res) {
        try {
            const service = new VehicleService();
            const result = await service.findByID(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async deleteVehicle(req, res) {
        try {
            const service = new VehicleService();
            const result = await service.delete(req.params.id);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async patchVehicle(req, res) {
        try {
            const service = new VehicleService();
            const result = await service.update(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }
}