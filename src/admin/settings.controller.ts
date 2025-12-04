import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SettingsService } from '../settings/settings.service';
import { SettingCategory, SettingType } from '../entities/settings.entity';

interface UpdateSettingDto {
  value: any;
  label?: string;
  description?: string;
  type?: SettingType;
  isSensitive?: boolean;
}

@Controller('admin/settings')
@UseGuards(JwtAuthGuard)
export class AdminSettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getAllSettings() {
    const categories = Object.values(SettingCategory);
    const data: Record<string, any> = {};
    for (const category of categories) {
      data[category] = await this.settingsService.getSettingsByCategory(category as SettingCategory, true);
    }
    return { data };
  }

  @Get(':category')
  async getSettingsByCategory(@Param('category') category: SettingCategory) {
    const settings = await this.settingsService.getSettingsByCategory(category, true);
    return { data: settings };
  }

  @Get(':category/:key')
  async getSetting(@Param('category') category: SettingCategory, @Param('key') key: string) {
    const value = await this.settingsService.getSetting(category, key, true);
    return { data: { category, key, value } };
  }

  @Put(':category/:key')
  async updateSetting(
    @Param('category') category: SettingCategory,
    @Param('key') key: string,
    @Body() dto: UpdateSettingDto,
  ) {
    const setting = await this.settingsService.upsertSetting({
      category,
      key,
      value: dto.value,
      label: dto.label,
      description: dto.description,
      type: dto.type,
      isSensitive: dto.isSensitive,
    });
    return { data: setting };
  }

  @Post('initialize')
  async initializeDefaults() {
    await this.settingsService.initializeDefaults();
    return { success: true };
  }
}


