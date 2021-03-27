'use strict';

const controller = require('./base');
const constants = require('../utils/constants');
const VehicleUseService = require('../services/vehicleUseService');


module.exports = class VehicleUseController {
    static async getVehiclesUse(req, res) {
        try {
            const service = new VehicleUseService();
            const result = await service.find(req.query);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async postVehicleUse(req, res) {
        try {
            const service = new VehicleUseService();
            const result = await service.create(req.body);

            res.status(constants.statusCode.CREATED.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async getVehicleUse(req, res) {
        try {
            const service = new VehicleUseService();
            const result = await service.findByID(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async deleteVehicleUse(req, res) {
        try {
            const service = new VehicleUseService();
            const result = await service.delete(req.params.id);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async patchVehicleUse(req, res) {
        try {
            const service = new VehicleUseService();
            const result = await service.update(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }
}