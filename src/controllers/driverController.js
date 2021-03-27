'use strict';

const controller = require('./base');
const constants = require('../utils/constants');
const DriverService = require('../services/driverService');

module.exports = class DriverController {
    static async getDrivers(req, res) {
        try {
            const service = new DriverService();
            const result = await service.find(req.query);

            res.set('X-Total-Count', result.totalCount);
            res.set('X-Total-Page', result.totalPage);
            res.status(constants.statusCode.SUCCESS.CODE).send(result.results);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async postDriver(req, res) {
        try {
            const service = new DriverService();
            const result = await service.create(req.body);

            res.status(constants.statusCode.CREATED.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async getDriver(req, res) {
        try {
            const service = new DriverService();
            const result = await service.findByID(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async deleteDriver(req, res) {
        try {
            const service = new DriverService();
            const result = await service.delete(req.params.id);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }

    static async patchDriver(req, res) {
        try {
            const service = new DriverService();
            const result = await service.update(req.params.id, req.body);

            res.status(constants.statusCode.SUCCESS.CODE).send(result);
        } catch (err) {
            controller.sendErrorResponse(res, err);
        }
    }
}