"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
let JwtGuard = class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
        this.jwtService = new jwt_1.JwtService();
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const tokens = this.extractTokenFromRequest(request);
        if (!tokens?.accessToken) {
            throw new common_1.UnauthorizedException('Session expired, please log in again');
        }
        try {
            const secret = process.env.JWT_ACCESS_SECRET;
            const expiresin = process.env.JWT_ACCESS_TOKEN_EXPIRATION;
            console.log("secret", secret, "expires", expiresin);
            console.log("token", tokens);
            const decodedAccessToken = this.jwtService.verify(tokens.accessToken, {
                secret: process.env.JWT_ACCESS_SECRET
            });
            request.user = decodedAccessToken.user;
            return true;
        }
        catch (error) {
            console.log("token error", error.message);
            if (error instanceof jwt_1.TokenExpiredError)
                throw new common_1.UnprocessableEntityException("Token Expired");
            throw new common_1.UnauthorizedException('Invalid access token');
        }
    }
    async handleTokenRefresh(refreshToken, request, response) {
        try {
            const decodedRefreshToken = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            request.user = decodedRefreshToken.user;
            const newAccessToken = this.jwtService.sign({ user: decodedRefreshToken.user }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1d' });
            this.setAccessTokenInCookies(request, response, newAccessToken);
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('We could not refresh your session');
        }
    }
    extractTokenFromRequest(request) {
        if (request.cookies &&
            (request.cookies.hp_access_token || request.cookies.hp_refresh_token)) {
            return {
                accessToken: request.cookies.hp_access_token,
                refreshToken: request.cookies.hp_refresh_token,
            };
        }
        if (request.headers.authorization) {
            const authHeader = request.headers.authorization;
            const [bearer, accessToken] = authHeader.split(' ');
            if (bearer === 'Bearer' && accessToken) {
                return { accessToken };
            }
        }
        return null;
    }
    setAccessTokenInCookies(req, res, accessToken) {
        const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
        res.cookie('hp_access_token', accessToken, {
            httpOnly: true,
            secure: isSecure,
            sameSite: isSecure ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/',
        });
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtGuard);
//# sourceMappingURL=jwt.guards.js.map