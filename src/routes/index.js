'use strict';

const routes = require('express').Router();

const VehicleController = require('../controllers/vehicleController');
const DriverController = require('../controllers/driverController');
const LoginController = require('../controllers/loginController');

routes.get('/api/v1/vehicles', VehicleController.getVehicles);
routes.post("/api/v1/vehicles", VehicleController.postVehicle);
routes.get("/api/v1/vehicles/:id", VehicleController.getVehicle);
routes.delete("/api/v1/vehicles/:id", VehicleController.deleteVehicle);
routes.patch("/api/v1/vehicles/:id", VehicleController.patchVehicle);

routes.get('/api/v1/drivers', DriverController.getDrivers);
routes.post("/api/v1/drivers", DriverController.postDriver);
routes.get("/api/v1/drivers/:id", DriverController.getDriver);
routes.delete("/api/v1/drivers/:id", DriverController.deleteDriver);
routes.patch("/api/v1/drivers/:id", DriverController.patchDriver);

routes.post("/api/v1/login", LoginController.postLogin);

module.exports = routes;