'use strict';

const log = require('../log');
const constants = require('../utils/constants');

const { UnauthorizedException, NotFoundException, UnprocessableEntityException } = require('../exceptions');

module.exports = {
    /**
    * 
    * @param {Response} res 
    * @param {Error} err 
    */
    sendErrorResponse(res, err) {
        const apiError = {
            code: constants.statusCode.INTERNAL_SERVER_ERROR.CODE,
            message: constants.statusCode.INTERNAL_SERVER_ERROR_SUPPORT,
            error: constants.statusCode.INTERNAL_SERVER_ERROR.TEXT
        }

        if (err instanceof UnauthorizedException) {
            apiError.code = constants.statusCode.UNAUTHORIZED.CODE;
            apiError.message = err.message;
            apiError.error = constants.statusCode.UNAUTHORIZED.TEXT
        } else if (err instanceof NotFoundException) {
            apiError.code = constants.statusCode.NOT_FOUND.CODE;
            apiError.message = err.message;
            apiError.error = constants.statusCode.NOT_FOUND.TEXT;
        } else if (err instanceof UnprocessableEntityException) {
            apiError.code = constants.statusCode.UNPROCESSABLE_ENTITY.CODE;
            apiError.message = err.message;
            apiError.error = constants.statusCode.UNPROCESSABLE_ENTITY.TEXT;
        }
        else {
            log.error(err);
        }

        res.status(apiError.code).send(apiError);
    }
}