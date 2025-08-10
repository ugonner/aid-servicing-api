import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBooleanString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ILocationAddressDTO } from "./aid-service.dto";
import { QueryDateDTO } from "./query-request.dto copy";
import { BookingStatus } from "../enums/booking.enum";

export class BookingDTO {

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    bookingNote?: string;
    
    @ValidateNested()
    @Type(() => ILocationAddressDTO)
    locationAddress: ILocationAddressDTO
    
    @ApiProperty()
    @IsString()
    startDate: string;
    
    @ApiProperty()
    @IsNumber()
    duration: number;
    
    @ApiProperty()
    @IsNumber()
    aidServiceId: number;
    
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    aidServiceProfileId?: number;
    
}

export class QueryBookingDTO extends QueryDateDTO {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userId: string;

    @ApiPropertyOptional()
    @IsEnum(BookingStatus)
    @IsOptional()
    bookingStatus?: BookingStatus;

    @ApiPropertyOptional()
    @IsBooleanString()
    @IsOptional()
    isMatched: string;
}