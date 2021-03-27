'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const jsyaml = require('js-yaml');
const fs = require('fs');
const openApiValidator = require('express-openapi-validator');

const log = require('./src/log');
const config = require('./src/config');
const routes = require('./src/routes');
const apiErrorValidator = require('./src/middlewares/apiErrorValidators');
const apiKeyAuth = require('./src/middlewares/apiKeyAuth');
const Database = require('./src/db');

class Server {
    #app = express();

    async start() {
        await this._init();

        http.createServer(this.#app)
            .listen(config.server.port, () => log.info(`Server HTTP is listening on port ${config.server.port}`))
    }

    async _init() {
        await this._dbSetup();
        this._expressSetup();
        this._docsSetup();
        this._routesSetup();
        this._errorValidatorHandler();
    }

    _expressSetup() {
        this.#app.use(cors());
        this.#app.use(helmet());
        this.#app.use(bodyParser.urlencoded({ extended: true }));
        this.#app.use(bodyParser.json());
        this.#app.use(cors({
            exposedHeaders: ['X-Total-Count', 'X-Total-Page']
        }))
    }

    _docsSetup() {
        let apiSpec = path.join(__dirname, 'src/openapi.yaml');
        this.#app.use('/docs', swaggerUI.serve, swaggerUI.setup(jsyaml.load(fs.readFileSync(apiSpec, 'utf-8'))));
        this.#app.use(
            openApiValidator.middleware({
                apiSpec: apiSpec,
                validateRequests: true,
                validateResponses: true,
                validateSecurity: {
                    handlers: {
                        ApiKeyAuth: apiKeyAuth
                    }
                }
            })
        )
    }

    async _dbSetup() {
        const db = new Database();
        await db.start();
    }

    _routesSetup() {
        this.#app.use(routes);
    }

    _errorValidatorHandler() {
        this.#app.use(apiErrorValidator);
    }
}

const server = new Server();
server.start();