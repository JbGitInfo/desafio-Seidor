'use strict';

const routes = require('express').Router();

const { VehicleController, DriverController, VehicleUseController, LoginController } = require('../controllers');


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

routes.get('/api/v1/vehiclesUse', VehicleUseController.getVehiclesUse);
routes.post("/api/v1/vehiclesUse", VehicleUseController.postVehicleUse);
routes.get("/api/v1/vehiclesUse/:id", VehicleUseController.getVehicleUse);
routes.delete("/api/v1/vehiclesUse/:id", VehicleUseController.deleteVehicleUse);
routes.patch("/api/v1/vehiclesUse/:id", VehicleUseController.patchVehicleUse);

routes.post("/api/v1/login", LoginController.postLogin);

module.exports = routes;