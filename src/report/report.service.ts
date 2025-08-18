import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Profile } from '../entities/user.entity';
import { AidServiceProfile } from '../entities/aid-service-profile.entity';
import { Booking } from '../entities/booking.entity';
import { CallRoom } from '../entities/call.entity';
import { Report } from '../entities/report.entity';
import { ServiceType } from '../shared/enums/review';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { QueryReviewAndReportDTO, ReviewAndRatingDTO, UpdateReportDTO } from '../shared/dtos/review.dto';
import { handleDateQuery } from '../shared/helpers/db';

@Injectable()
export class ReportService {
    constructor(
        @InjectDataSource()
        private dataSource: DataSource
    ){}

    async createReport(dto: ReviewAndRatingDTO, userId: string): Promise<Report> {
        let newReport: Report;
        let errorData: unknown;
        const queryRunner = this.dataSource.createQueryRunner();
        try{
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(Profile, {userId});
            
            if(!profile) throw new BadRequestException("User profile not found");
            let aidServiceProfile: AidServiceProfile;
            let entityOwner: Profile;
            if(dto.serviceType === ServiceType.BOOKING) {
                const booking = await queryRunner.manager.findOne(Booking, {
                    where: {id: dto.serviceTypeEntityId},
                    relations: ["aidServiceProfile", "aidServiceProfile.profile"]
                });
                if(!booking) throw new NotFoundException("boooking not found");

                aidServiceProfile = booking.aidServiceProfile;
                entityOwner = booking.aidServiceProfile.profile;
               
            }
            else if(dto.serviceType === ServiceType.CALL) {
                const callRoom = await queryRunner.manager.findOne(CallRoom, {
                    where: {id: dto.serviceTypeEntityId},
                    relations: ["aidServiceProfile", "aidServiceProfile.profile"]
                });
                if(!callRoom) throw new NotFoundException("Call room not found");

                aidServiceProfile = callRoom.aidServiceProfile;
                entityOwner = callRoom.aidServiceProfile.profile;
            }

           
            const reportData = queryRunner.manager.create(Report, dto);
            const savedReport = await queryRunner.manager.save(Report, reportData);
            await queryRunner.commitTransaction();
            newReport = savedReport;
        }catch(error){
            errorData = error;
            await queryRunner.rollbackTransaction();
        }finally{
            await queryRunner.release();
            if(errorData) throw errorData;
            return newReport;
        }
    }

    async updateReport(dto: UpdateReportDTO, userId: string): Promise<Report> {
        let updatedReport: Report;
        let errorData: unknown;
        const queryRunner = this.dataSource.createQueryRunner();
        try{
            await queryRunner.startTransaction();
            const profile = await queryRunner.manager.findOneBy(Profile, {userId});
            if(!profile) throw new NotFoundException("User profile not found");

            const report = await queryRunner.manager.findOneBy(Report, {
                id: dto.reportId
            });
            if(!report) throw new NotFoundException("Report not found");
            report.resolvedById = profile.id;
            if(dto.comment) report.comment = dto.comment;
            if(dto.resolved == false) report.isResolved = false;
            else if(dto.resolved == true) report.isResolved = true;

            await queryRunner.manager.save(Report, {...report});
            await queryRunner.commitTransaction();
            updatedReport = report;

        }catch(error){
            errorData = error;
            await queryRunner.rollbackTransaction();
        }finally{
            await queryRunner.release();
            if(errorData) throw errorData;
            return updatedReport;
        }
    }
    
        async getReports(dto: QueryReviewAndReportDTO): Promise<IQueryResult<Report>> {
            const {
              searchTerm,
              startDate,
              endDate,
              dDate,
              order,
              page,
              limit,
              ...queryFields
            } = dto;
            const queryPage = page ? Number(page) : 1;
            const queryLimit = limit ? Number(limit) : 10;
            const queryOrder = order ? order.toUpperCase() : 'DESC';
            const queryOrderBy =  "createdAt";
        
            let queryBuilder = this.dataSource.getRepository(Report).createQueryBuilder("report");
            queryBuilder.leftJoinAndSelect("profile", "profile", "report.profileId = profile.id");
            queryBuilder.leftJoin("profile", "adminProfile", "report.resolvedById = profile.id");
            
            if(dto.serviceType === ServiceType.BOOKING) {
                queryBuilder.leftJoinAndSelect("booking", "booking", "report.serviceEntityId = booking.id")
                .leftJoinAndSelect("booking.aidServiceProfile", "aidServiceProfile");
            }
            else if(dto.serviceType === ServiceType.CALL) {
                queryBuilder.leftJoinAndSelect("call_room", "callRoom", "report.serviceEntityId = call_room.id" )
                .leftJoinAndSelect("callRoom.aidServiceProfile", "aidServiceProfile");
            }
            queryBuilder.leftJoinAndSelect("aidServiceProfile.profile", "serviceProfile");
            
            queryBuilder.where("booking.isDeleted != :isDeleted", {isDeleted: true});
        
            if (queryFields) {
              Object.keys(queryFields).forEach((field) => {
                queryBuilder.andWhere(`report.${field} = :value`, {
                  value: queryFields[field],
                });
              });
            }
        
            if (startDate || endDate || dDate) {
              queryBuilder = handleDateQuery<Report>(
                { startDate, endDate, dDate, entityAlias: 'report' },
                queryBuilder,
                'createdAt',
              );
            }
        
        
        
            if (searchTerm) {
              const searchFields = ["userId","firstName", "lastName"];
              let queryStr = `LOWER(serviceProfile.email) LIKE :searchTerm`;
              searchFields.forEach((field) => {
                queryStr += ` OR LOWER(serviceProfile.${field}) LIKE :searchTerm`;
              });
              ["email", "userId","firstName", "lastName"].forEach((field) => {
                queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
              });
              ["name"].forEach((field) => {
                queryStr += ` OR LOWER(aidServiceProfile.${field}) LIKE :searchTerm`;
              });
              queryBuilder.andWhere(queryStr, {
                searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
              });
            }
        
            
            const [data, total] = await queryBuilder
              .orderBy(`report.${queryOrderBy}`, queryOrder as 'ASC' | 'DESC')
              .skip((queryPage - 1) * queryLimit)
              .limit(queryLimit)
              .getManyAndCount();
        
            return { page: queryPage, limit: queryLimit, total, data };
          }
}
