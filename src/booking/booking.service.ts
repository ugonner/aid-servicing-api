import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, DeleteQueryBuilder, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { BookingDTO, QueryBookingDTO } from '../shared/dtos/booking.dto';
import { Booking } from '../entities/booking.entity';
import { Profile } from '../entities/user.entity';
import { AidService } from '../entities/aid-service.entity';
import { AidServiceProfile } from '../entities/aid-service-profile.entity';
import { BookingStatus } from '../shared/enums/booking.enum';
import { ProfileWallet } from '../entities/user-wallet.entity';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { handleDateQuery } from '../shared/helpers/db';

@Injectable()
export class BookingService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}


  async isServiceProfileEligibleForBooking(aidServiceProfileId: number, bookingDto: BookingDTO, queryRunner?: QueryRunner ): Promise<boolean> {
    queryRunner = queryRunner || this.dataSource.createQueryRunner();

    if(!aidServiceProfileId) throw new BadRequestException("aidServiceProfileId is required");
    const aidServiceProfile = await queryRunner.manager.findOne(
          AidServiceProfile,
          {
            where: { id: aidServiceProfileId },
            relations: ['profile', 'aidService'],
          },
        );

        const availableProfiles = await this.getBookingEligibleProfiles({
          bookingStartDateTime: bookingDto.startDate,
         bookingEndDateTime: new Date(new Date(bookingDto.startDate).getTime() + Number(bookingDto.duration)).toISOString(),
          aidServiceId: bookingDto.aidServiceId,
        });
        if (aidServiceProfile.aidService?.id !== bookingDto.aidServiceId)
          throw new BadRequestException(
            'Selected provider does not offer the service',
          );
        if (
          !availableProfiles.find(
            (profile) => profile.userId === aidServiceProfile.profile?.userId,
          )
        )
          throw new BadRequestException('Selected provider is not available');
        return true;
  }

  async createBooking(dto: BookingDTO, userId: string): Promise<Booking> {
    let newBooking: Booking;
    let errorData: unknown;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();
      const { aidServiceId, aidServiceProfileId, ...bookingDto } = dto;
      const profile = await queryRunner.manager.findOneBy(Profile, { userId });
      if (!profile) throw new NotFoundException('user not found');

      const aidService = await queryRunner.manager.findOneBy(AidService, {
        id: aidServiceId,
      });

      if (!aidService)
        throw new BadRequestException('Aid service does not exist');
     
      const endDate = new Date(
        new Date(bookingDto.startDate).getTime() + Number(bookingDto.duration),
      ).toISOString();
      
      const bookingInstance: Booking = queryRunner.manager.create(Booking, {
        ...bookingDto,
        startDate: bookingDto.startDate,
        endDate,
        aidService,
        profile,
      });

      bookingInstance.totalAmount = Math.ceil(
        (Number(bookingDto.duration) * Number(aidService.onSiteRate)) / 1000,
      );
      bookingInstance.compositeBookingId = `${profile.userId}-${bookingDto.startDate}`;

      if (aidServiceProfileId) {
        const aidServiceProfile = await queryRunner.manager.findOne(
          AidServiceProfile,
          {
            where: { id: aidServiceProfileId },
            relations: ['profile', 'aidService'],
          },
        );

        const availableProfiles = await this.getBookingEligibleProfiles({
          bookingStartDateTime: bookingInstance.startDate,
          bookingEndDateTime: bookingInstance.endDate,
          aidServiceId: aidServiceId,
        });
        if (aidServiceProfile.aidService?.id !== aidServiceId)
          throw new BadRequestException(
            'Selected provider does not offer the service',
          );
        if (
          !availableProfiles.find(
            (profile) => profile.userId === aidServiceProfile.profile?.userId,
          )
        )
          throw new BadRequestException('Selected provider is not available');
        bookingInstance.aidServiceProfile = aidServiceProfile;
        bookingInstance.isMatched = true;
      }

      const savedBooking = await queryRunner.manager.save(
        Booking,
        bookingInstance,
      );
      await queryRunner.commitTransaction();
      newBooking = savedBooking;
    } catch (error) {
      errorData = error;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (errorData) throw errorData;
      return newBooking;
    }
  }

  async confirmBookingService(
    userId: string,
    bookingId: number,
    userType: { isProvider?: boolean; isUser?: boolean },
  ): Promise<Booking> {
    let updatedBooking: Booking;
    let errorData: unknown;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const booking = await queryRunner.manager.findOne(Booking, {
        where: { id: bookingId },
        relations: [
          'profile',
          'aidServiceProfile',
          'aidServiceProfile.profile',
        ],
      });
      if (!booking) throw new NotFoundException('booking not found');
      if (userType.isProvider) {
        if (booking.aidServiceProfile?.profile?.userId !== userId)
          throw new BadRequestException(
            'You are not the provider of this service',
          );
        booking.confirmedByProvider = true;
      }

      if (userType.isUser) {
        if (booking.profile?.userId !== userId)
          throw new BadRequestException(
            'You are not the owner of this booking',
          );
        booking.confirmedByUser = true;

        const bookingAidServiceProfile = booking.aidServiceProfile;
        const userWallet = await queryRunner.manager.findOneBy(ProfileWallet, {
          profile: { userId },
        });
        const providerWallet = await queryRunner.manager.findOneBy(
          ProfileWallet,
          {
            profile: { userId: bookingAidServiceProfile.profile.userId },
          },
        );

        userWallet.pendingBalance =
          Number(userWallet.pendingBalance) - Number(booking.totalAmount);
        providerWallet.earnedBalance =
          Number(providerWallet.earnedBalance) + Number(booking.totalAmount);
        await queryRunner.manager.save(ProfileWallet, [
          userWallet,
          providerWallet,
        ]);

        bookingAidServiceProfile.onSiteEarnings =
          Number(bookingAidServiceProfile.onSiteEarnings) +
          Number(booking.totalAmount);
        await queryRunner.manager.save(
          AidServiceProfile,
          bookingAidServiceProfile,
        );
      }

      const savedBooking = await queryRunner.manager.save(Booking, booking);
      await queryRunner.commitTransaction();
      updatedBooking = savedBooking;
    } catch (error) {
      errorData = error;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (errorData) throw errorData;
      return updatedBooking;
    }
  }

  async getBooking(bookingId: number): Promise<Booking> {
    return this.dataSource.getRepository(Booking).findOne({
      where: {id: bookingId},
      relations: ["profile", "aidService", "aidServiceProfile", "aidServiceProfile.profile" ]
    })
  }
  async getBookingEligibleProfiles(dto: {
    aidServiceId: number;
    bookingStartDateTime: string;
    bookingEndDateTime: string;
  }): Promise<Profile[]> {
    const { bookingStartDateTime, aidServiceId, bookingEndDateTime } = dto;
    
    const oneHourAfterEndTime = new Date((new Date(bookingEndDateTime).getTime()) + (1* 60 * 60 * 1000)).toISOString();
    const oneHourBeforeStartTime = new Date((new Date(bookingStartDateTime).getTime()) - (1* 60 * 60 * 1000)).toISOString();
   
    const queryBuilder = this.dataSource
      .getRepository(Profile)
      .createQueryBuilder('profile');
    queryBuilder
      .innerJoinAndSelect('profile.aidServiceProfiles', 'aidServiceProfiles')
      .innerJoinAndSelect('aidServiceProfiles.aidService', 'aidService')
      .innerJoin('aidServiceProfiles.bookings', 'bookings')
      .where('profile.isDeleted = false')
      .andWhere('aidServiceProfiles.aidServiceId = :aidServiceId', {
        aidServiceId,
      })
      .andWhere(
       "((bookings.startDate) >= :oneHourAfterEndTime) || ((bookings.endDate) <= :oneHourBeforeStartTime) ",
        {
          oneHourAfterEndTime,
          oneHourBeforeStartTime,
        },
      );

    return await queryBuilder.getMany();
  }

  async matchBookingWithServiceProfile(bookingData: Booking | number): Promise<Booking> {
    let updatedBooking: Booking;
    let errorData: unknown;
    const queryRunner = this.dataSource.createQueryRunner();
    try {
        await queryRunner.startTransaction();
        const booking = typeof(bookingData) !== "object" ? await queryRunner.manager.findOne(Booking, {
            where: {id: bookingData},
            relations: ["profile", "aidService", "aidServiceProfile"]
        }) : (bookingData as Booking);
      const eligibleProfiles = await this.getBookingEligibleProfiles({
        bookingStartDateTime: booking.startDate,
        bookingEndDateTime: booking.endDate,
        aidServiceId: booking.aidService.id,
      });
      if (eligibleProfiles?.length > 0) {
        const sortedProfiles = eligibleProfiles.sort((a, b) => {
          (a as Profile & { score: number }).score = this.scoreProfileToBooking(
            a,
            booking,
          );
          (b as Profile & { score: number }).score = this.scoreProfileToBooking(
            b,
            booking,
          );
          return (
            (b as Profile & { score: number }).score -
            (a as Profile & { score: number }).score
          );
        });
        booking.aidServiceProfile = sortedProfiles[0].aidServiceProfiles.find(
          (aidProfile) => aidProfile.aidService.id === booking.aidService.id,
        );
        booking.isMatched = true;
      }
      const savedBooking = await queryRunner.manager.save(Booking, {
        ...booking,
      });
      await queryRunner.commitTransaction();
      updatedBooking = savedBooking;
    } catch (error) {
      errorData = error;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (errorData) throw errorData;
      return updatedBooking;
    }
  }

  scoreProfileToBooking(profile: Profile, booking: Booking): number {
    let score = 0;
    const targetAidProfile = profile.aidServiceProfiles.find(
      (aidProfile) => aidProfile.aidService.id === booking.aidService.id,
    );
    if (profile.disabilityType) score += 5;

    const countryMatch = new RegExp(booking.locationAddress.country, 'i').test(
      targetAidProfile.locationAddress.country,
    );
    const stateMatch = new RegExp(booking.locationAddress.state, 'i').test(
      targetAidProfile.locationAddress.state,
    );
    const localityMatch = new RegExp(
      booking.locationAddress.locality,
      'i',
    ).test(targetAidProfile.locationAddress.locality);
    const cityMatch = new RegExp(booking.locationAddress.city, 'i').test(
      targetAidProfile.locationAddress.city,
    );
    if (countryMatch && stateMatch && localityMatch && cityMatch) score += 5;
    else if (countryMatch && stateMatch && localityMatch) score += 4;
    else if (countryMatch && stateMatch) score += 3;

    return score;
  }

  getQueryBuilder(): SelectQueryBuilder<Booking> {
    return this.dataSource.getRepository(Booking).createQueryBuilder("booking")
    .leftJoin("booking.profile", "profile")
    .leftJoin("booking.aidService", "aidService")
    .leftJoin("booking.aidServiceProfile", "aidServiceProfile")
    .leftJoin("aidServiceProfile.profile", "aidServiceProfileProfile")
  }

  async getBookings(dto: QueryBookingDTO): Promise<IQueryResult<Booking>> {
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

    let queryBuilder = this.getQueryBuilder();
    queryBuilder.where("booking.isDeleted != :isDeleted", {isDeleted: true});

    if (queryFields) {
      Object.keys(queryFields).forEach((field) => {
        queryBuilder.andWhere(`booking.${field} = :value`, {
          value: queryFields[field],
        });
      });
    }

    if (startDate || endDate || dDate) {
      queryBuilder = handleDateQuery<Booking>(
        { startDate, endDate, dDate, entityAlias: 'booking' },
        queryBuilder,
        'createdAt',
      );
    }



    if (searchTerm) {
      const searchFields = ['name', 'description'];
      let queryStr = `LOWER(booking.name) LIKE :searchTerm`;
      searchFields.forEach((field) => {
        queryStr += ` OR LOWER(booking.${field}) LIKE :searchTerm`;
      });
      ["email", "userId","firstName", "lastName"].forEach((field) => {
        queryStr += ` OR LOWER(profile.${field}) LIKE :searchTerm`;
      });
      ["email", "userId", "firstName", "lastName"].forEach((field) => {
        queryStr += ` OR LOWER(aidServiceProfileProfile.${field}) LIKE :searchTerm`;
      });
      queryBuilder.andWhere(queryStr, {
        searchTerm: `%${searchTerm.toLowerCase().trim()}%`,
      });
    }

    
    const [data, total] = await queryBuilder
      .orderBy(`booking.${queryOrderBy}`, queryOrder as 'ASC' | 'DESC')
      .skip((queryPage - 1) * queryLimit)
      .limit(queryLimit)
      .getManyAndCount();

    return { page: queryPage, limit: queryLimit, total, data };
  }

}
