import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AllExceptionFilter } from '../shared/interceptors/all-exceptions.filter';
import { ApiTags } from '@nestjs/swagger';
import { OCRService } from './ocr.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { OCRRequestDto } from './dtos/ocr.request.dto';
import { ApiResponse } from '../shared/helpers/apiresponse';

@ApiTags("ocr")
@UseFilters(AllExceptionFilter)
@Controller("ocr")
export class OCRController {
    constructor(
        private ocrService: OCRService
    ){}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async extractImageContent(
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: OCRRequestDto
    ){
        const res = await this.ocrService.describeImage(payload, file);
        return ApiResponse.success("Image extracted successfully", res);
    }
  
    @Get()
    async getModels(){
        const res = await this.ocrService.getModels();
        return ApiResponse.success("Models got successfully", res)
    }
}
