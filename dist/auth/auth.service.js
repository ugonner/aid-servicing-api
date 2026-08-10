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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_entity_1 = require("../entities/auth.entity");
const bcrypt = require("bcryptjs");
const class_validator_1 = require("class-validator");
const db_1 = require("../shared/helpers/db");
const user_entity_1 = require("../entities/user.entity");
const child_process_1 = require("child_process");
const os = require("os");
const user_wallet_entity_1 = require("../entities/user-wallet.entity");
const mail_service_1 = require("../mail/mail.service");
const role_entity_1 = require("../entities/role.entity");
let AuthService = AuthService_1 = class AuthService {
    constructor(authRepository, jwtService, dataSource, mailService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.dataSource = dataSource;
        this.mailService = mailService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    generateOTP() {
        return Number(`${Math.random()}`.substr(2, 6));
    }
    async createAccount(dto) {
        let newAuth;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await this.validateDto(dto);
            const { email, firstName, lastName, gender, disabilityType, ...rest } = dto;
            const userExist = await queryRunner.manager.findOneBy(auth_entity_1.Auth, [
                { email },
                { phoneNumber: dto.phoneNumber },
            ]);
            if (userExist)
                throw new common_1.BadRequestException('Email already / Phone number exists');
            const payload = {
                email: email.toLowerCase(),
                ...rest,
                firstName,
                lastName,
                isVerified: true,
            };
            payload.otpTime = new Date();
            payload.userId = await db_1.DBUtils.generateUniqueID(this.authRepository, 'userId', 8, firstName);
            payload.otp = this.generateOTP();
            const auth = queryRunner.manager.create(auth_entity_1.Auth, payload);
            await queryRunner.manager.save(auth_entity_1.Auth, auth);
            const profile = queryRunner.manager.create(user_entity_1.Profile, {
                userId: auth.userId,
                email: email.toLowerCase(),
                firstName,
                lastName,
                gender,
                disabilityType,
                account: auth,
            });
            const newUserProfile = await queryRunner.manager.save(user_entity_1.Profile, profile);
            const walletData = queryRunner.manager.create(user_wallet_entity_1.ProfileWallet, { profile });
            const wallet = await queryRunner.manager.save(user_wallet_entity_1.ProfileWallet, walletData);
            profile.wallet = wallet;
            await queryRunner.manager.save(user_entity_1.Profile, profile);
            auth.profile = newUserProfile;
            await queryRunner.manager.save(auth_entity_1.Auth, auth);
            this.mailService.sendEmail({
                to: [auth.email],
                subject: 'Account Creation Activation',
                context: {
                    receiverName: auth.firstName,
                    entries: {
                        otp: payload.otp,
                        name: firstName,
                    },
                },
            })
                .catch((err) => console.log("Error sending signup OTP out mail", err.message));
            await queryRunner.commitTransaction();
            newAuth = auth;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return newAuth;
        }
    }
    async validateDto(registerDto) {
        const errors = await (0, class_validator_1.validate)(registerDto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
    }
    async login(dto, values) {
        const user = await this.authRepository.findOne({
            where: [
                { email: dto.email.toLowerCase() },
                { phoneNumber: dto.phoneNumber },
            ],
            relations: ['profile'],
        });
        if (!user)
            throw new common_1.NotFoundException('Invalid credentials');
        if (!user.isVerified)
            throw new common_1.BadRequestException('Account not verified');
        const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordMatch)
            throw new common_1.BadRequestException('Invalid credentials');
        const { accessToken, refreshToken } = await this.generateRefreshAndAccessToken(user.toAuthData(), values);
        const userData = {
            ...user,
            token: accessToken,
            refreshToken,
        };
        return userData;
    }
    async generateRefreshAndAccessToken(user, refreshData) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                user,
            }, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
            }),
            this.jwtService.signAsync({
                userId: user.userId,
                ...refreshData,
            }, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async verifyAccount(dto, values) {
        const auth = await this.authRepository.findOneBy({ email: dto.email });
        if (!auth)
            throw new common_1.NotFoundException('No account found, you can re-register again');
        if (auth.isVerified)
            throw new common_1.BadRequestException('aCCOUNT ALREADY verified, sign in');
        const otpExpireTime = new Date(auth.otpTime).getTime() + 10 * 60 * 1000;
        if (otpExpireTime < Date.now()) {
            throw new common_1.ForbiddenException('Verification code has expired');
        }
        await this.authRepository.update({ email: auth.email }, { isVerified: true, otp: undefined });
        this.mailService.sendEmail({
            to: [auth.email],
            subject: 'Account Verified',
            context: {
                receiverName: auth.firstName,
                message: 'Your Account has been verified succesfully, Go ahead and login',
            },
        })
            .catch((err) => console.log("Error sending account verification email", err.message));
        const { accessToken, refreshToken } = await this.generateRefreshAndAccessToken(auth.toAuthData(), values);
        return { token: accessToken, refresh: refreshToken };
    }
    async resendOtp(payload) {
        try {
            const auth = await this.authRepository.findOne({
                where: { email: payload.email },
                relations: ['profile'],
            });
            if (!auth) {
                throw new common_1.NotFoundException('Account not found');
            }
            const otp = Number(Math.random().toString().substr(2, 6));
            await this.authRepository.update({ email: payload.email }, { otp, otpTime: new Date() });
            this.mailService.sendEmail({
                to: [auth.email],
                subject: 'OTP Sent',
                context: {
                    receiverName: auth.firstName,
                    message: `${auth.profile.firstName}, The below information is generated for your use, otp: ${otp}`,
                    entries: { otp },
                },
            });
            return { email: payload.email, otp };
        }
        catch (error) {
            this.logger.error('Resend verification code failed', error.stack);
            throw new common_1.BadRequestException(error.message || 'Resend verification code failed');
        }
    }
    async requestResetPassword(payload) {
        const auth = await this.authRepository.findOne({
            where: { email: payload.email },
            relations: ['profile'],
        });
        if (!auth) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (!auth.isVerified) {
            throw new common_1.BadRequestException('Account is not verified, kindly verify your account to proceed');
        }
        const otp = Number(Math.random().toString().substr(2, 6));
        await this.authRepository.update({ email: payload.email }, { otp, otpTime: new Date() });
        this.mailService.sendEmail({
            to: [payload.email],
            subject: 'Reset Password',
            context: {
                receiverName: auth.firstName,
                message: `Use ${otp} to reset your password`,
                entries: { otp },
            },
        });
        return {
            email: payload.email,
            otp,
        };
    }
    async resetPassword(payload) {
        const auth = await this.authRepository.findOneBy({ email: payload.email });
        if (!auth) {
            throw new common_1.NotFoundException('Account not found or invalid token');
        }
        if (!auth.isVerified) {
            throw new common_1.BadRequestException('Verify your account to proceed');
        }
        if (payload.otp !== auth.otp)
            throw new common_1.BadRequestException('Invalid OTP');
        const otpExpireTime = new Date(auth.otpTime).getTime() + 10 * 60 * 1000;
        if (otpExpireTime < new Date().getTime()) {
            throw new common_1.UnauthorizedException('Verification code has expired');
        }
        const password = await bcrypt.hash(payload.password, 10);
        await this.authRepository.update({ otp: auth.otp }, { password, otp: null });
        this.mailService.sendEmail({
            to: [payload.email],
            subject: 'Password reset successful',
            context: {
                receiverName: auth.firstName,
                message: 'Your password was reset successfully',
            },
        });
        return 'Password reset done';
    }
    async getAuthUsers(dto) {
        const { page, limit, searchTerm, order } = dto;
        const queryPage = page ? Number(page) : 1;
        const queryLimit = limit ? Number(limit) : 10;
        const querOrder = order ? order : 'ASC';
        const queryBuilder = this.authRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect(`user.aidServices`, `aidServices`);
        if (searchTerm) {
            const searchTermLowercase = searchTerm.toLowerCase();
            let whereClause = `LOWER("user"."email") LIKE '%${searchTermLowercase}%' `;
            ['firstName', 'lastName', 'phoneNumber'].forEach((field) => {
                whereClause += `OR LOWER("user"."${field}") LIKE '%${searchTermLowercase}%' `;
            });
            queryBuilder.where(whereClause);
        }
        queryBuilder.orderBy(`"user"."firstName"`, querOrder);
        if (page)
            queryBuilder.skip((queryPage - 1) * queryLimit).limit(queryLimit);
        const [data, total] = await queryBuilder.getManyAndCount();
        return { page: queryPage, limit: queryLimit, total, data };
    }
    async getIP() {
        const command = /win/i.test(os.platform()) ? 'ipconfig' : 'sudo ifconfig';
        const cmdRes = await new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (err, stOut, stdErr) => {
                if (err)
                    reject(err);
                resolve(stOut);
            });
        });
        console.log('cmdRes', cmdRes);
        const clientIpMatches = cmdRes.match(/IPv4 Address. . . . . . . . . . . :\s\d+\.\d+\.\d+\.\d+/g);
        if (!clientIpMatches)
            return '127.0.0.1';
        const clientIp = clientIpMatches[1] || clientIpMatches[0];
        return clientIp?.replace('IPv4 Address. . . . . . . . . . . : ', '').trim();
    }
    async createRole(dto) {
        let errorData;
        let savedRole;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const { name, description } = dto;
            const roleExists = await queryRunner.manager.findOneBy(role_entity_1.Role, { name: name.toLowerCase() });
            if (roleExists)
                throw new common_1.BadRequestException("Role already exists");
            const roledata = queryRunner.manager.create(role_entity_1.Role, { ...dto, name: name.toLowerCase() });
            const role = await queryRunner.manager.save(role_entity_1.Role, roledata);
            await queryRunner.commitTransaction();
            savedRole = role;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return savedRole;
        }
    }
    async updateRole(roleId, dto) {
        let errorData;
        let savedRole;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const roleExists = await queryRunner.manager.findOneBy(role_entity_1.Role, { id: roleId });
            if (!roleExists)
                throw new common_1.BadRequestException("Role not found");
            const roledata = queryRunner.manager.create(role_entity_1.Role, { ...roleExists, ...dto });
            if (dto.name)
                roledata.name = dto.name.toLowerCase();
            const role = await queryRunner.manager.save(role_entity_1.Role, roledata);
            await queryRunner.commitTransaction();
            savedRole = role;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return savedRole;
        }
    }
    async getRoles() {
        return await this.dataSource.getRepository(role_entity_1.Role).findBy({});
    }
    async assignRole(userId, roleId) {
        let updatedAuth;
        let errorData;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const auth = await queryRunner.manager.findOneBy(auth_entity_1.Auth, { userId });
            if (!auth)
                throw new common_1.NotFoundException("Profile not found");
            const role = await queryRunner.manager.findOneBy(role_entity_1.Role, { id: roleId });
            if (!role)
                throw new common_1.NotFoundException("Role not found");
            auth.role = role;
            const savedAuth = await queryRunner.manager.save(auth_entity_1.Auth, auth);
            await queryRunner.commitTransaction();
            updatedAuth = savedAuth;
        }
        catch (error) {
            errorData = error;
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            if (errorData)
                throw errorData;
            return updatedAuth;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __param(2, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        typeorm_2.DataSource,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map