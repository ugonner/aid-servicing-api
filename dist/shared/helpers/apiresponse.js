"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static success(message, data, statusCode) {
        return {
            status: "success",
            message,
            statusCode: statusCode ? statusCode : 200,
            data
        };
    }
    static fail(message, error, statusCode) {
        return {
            status: "error",
            message,
            statusCode: statusCode ? statusCode : 500,
            error
        };
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=apiresponse.js.map