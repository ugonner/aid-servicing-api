"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const apiresponse_1 = require("../helpers/apiresponse");
let AllExceptionFilter = class AllExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status;
        let errorMessage;
        errorMessage =
            'Something went wrong while processing your request. Please contact Admin.';
        status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponseMessage = Array.isArray(exception.response?.message) ? exception.response?.message[0] : exception.response?.message;
        common_1.Logger.error(`Exception caught: ${exception.message} with exception response: ${exceptionResponseMessage} `, {
            stack: exception.stack,
        });
        if (exception instanceof common_1.UnauthorizedException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage =
                errorResponse.message || exception.message;
        }
        else if (exception instanceof common_1.ForbiddenException) {
            status = common_1.HttpStatus.FORBIDDEN;
            errorMessage = 'You do not have permission to access this resource.';
        }
        else if (exception instanceof common_1.BadRequestException) {
            status = common_1.HttpStatus.BAD_REQUEST;
            errorMessage = exception.message;
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus() || common_1.HttpStatus.FORBIDDEN;
            errorMessage = exception.message || 'Invalid request';
        }
        if (!response.headersSent) {
            response.status(status).json(apiresponse_1.ApiResponse.fail(exceptionResponseMessage || errorMessage, {
                status,
                error: exception?.response?.message,
            }));
        }
        else {
            common_1.Logger.warn('Headers have already been sent, skipping response');
        }
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
//# sourceMappingURL=all-exceptions.filter.js.map