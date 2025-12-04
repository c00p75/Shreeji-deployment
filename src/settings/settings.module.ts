import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from '../entities/settings.entity';
import { SettingsService } from './settings.service';
import { EncryptionService } from '../common/services/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  providers: [SettingsService, EncryptionService],
  exports: [SettingsService],
})
export class SettingsModule {}


