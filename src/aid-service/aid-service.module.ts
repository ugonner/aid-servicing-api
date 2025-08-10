import { Module } from '@nestjs/common';
import { AidServiceService } from './aid-service.service';
import { AidServiceController } from './aid-service.controller';
import { MailModule } from '../mail/mail.module';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    MailModule,
    FileUploadModule
  ],
  providers: [AidServiceService],
  controllers: [AidServiceController]
})
export class AidServiceModule {}
