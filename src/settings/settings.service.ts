import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting, SettingCategory, SettingType } from '../entities/settings.entity';
import { EncryptionService } from '../common/services/encryption.service';

export interface SettingInput {
  category: SettingCategory;
  key: string;
  value: any;
  type?: SettingType;
  label?: string;
  description?: string;
  isSensitive?: boolean;
}

@Injectable()
export class SettingsService {
  private readonly cache = new Map<string, { value: any; expiresAt: number }>();
  private readonly cacheTtl = 5 * 60 * 1000; // 5 minutes

  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: Repository<Setting>,
    private readonly encryptionService: EncryptionService,
  ) {}

  private getCacheKey(category: SettingCategory, key: string) {
    return `${category}:${key}`;
  }

  private setCache(category: SettingCategory, key: string, value: any) {
    const cacheKey = this.getCacheKey(category, key);
    this.cache.set(cacheKey, { value, expiresAt: Date.now() + this.cacheTtl });
  }

  private getFromCache(category: SettingCategory, key: string) {
    const cacheKey = this.getCacheKey(category, key);
    const cached = this.cache.get(cacheKey);
    if (!cached) return null;
    if (cached.expiresAt < Date.now()) {
      this.cache.delete(cacheKey);
      return null;
    }
    return cached.value;
  }

  private clearCache(category: SettingCategory, key: string) {
    const cacheKey = this.getCacheKey(category, key);
    this.cache.delete(cacheKey);
  }

  private parseValue(setting: Setting, decrypt = true) {
    if (setting.isSensitive && decrypt && this.encryptionService.isEncrypted(setting.value)) {
      return this.encryptionService.decrypt(setting.value as string);
    }

    switch (setting.type) {
      case SettingType.NUMBER:
        return setting.value !== null ? Number(setting.value) : null;
      case SettingType.BOOLEAN:
        return setting.value === 'true' || setting.value === '1';
      case SettingType.JSON:
        return setting.value ? JSON.parse(setting.value) : null;
      default:
        return setting.value;
    }
  }

  private formatValue(value: any, type: SettingType | undefined, isSensitive?: boolean) {
    if (isSensitive || type === SettingType.ENCRYPTED) {
      return this.encryptionService.encrypt(String(value));
    }

    switch (type) {
      case SettingType.NUMBER:
        return String(value);
      case SettingType.BOOLEAN:
        return value ? 'true' : 'false';
      case SettingType.JSON:
        return JSON.stringify(value);
      default:
        return value !== undefined && value !== null ? String(value) : null;
    }
  }

  async getSetting(category: SettingCategory, key: string, decrypt = true) {
    const cached = this.getFromCache(category, key);
    if (cached !== null) {
      return cached;
    }

    const setting = await this.settingsRepository.findOne({
      where: { category, key, isActive: true },
    });

    if (!setting) {
      return null;
    }

    const value = this.parseValue(setting, decrypt);
    this.setCache(category, key, value);
    return value;
  }

  async getSettingsByCategory(category: SettingCategory, includeSensitive = false) {
    const settings = await this.settingsRepository.find({
      where: { category, isActive: true },
    });

    const result: Record<string, any> = {};
    for (const setting of settings) {
      if (setting.isSensitive && !includeSensitive) continue;
      result[setting.key] = this.parseValue(setting, true);
    }
    return result;
  }

  async upsertSetting(input: SettingInput) {
    const existing = await this.settingsRepository.findOne({
      where: { category: input.category, key: input.key },
    });

    const formattedValue = this.formatValue(input.value, input.type || existing?.type, input.isSensitive || existing?.isSensitive);

    if (existing) {
      existing.value = formattedValue;
      existing.type = input.type || existing.type;
      existing.label = input.label ?? existing.label;
      existing.description = input.description ?? existing.description;
      existing.isSensitive = input.isSensitive ?? existing.isSensitive;
      const saved = await this.settingsRepository.save(existing);
      this.clearCache(input.category, input.key);
      return saved;
    }

    const setting = this.settingsRepository.create({
      category: input.category,
      key: input.key,
      value: formattedValue,
      type: input.type || SettingType.STRING,
      label: input.label,
      description: input.description,
      isSensitive: input.isSensitive || false,
    });

    const saved = await this.settingsRepository.save(setting);
    this.clearCache(input.category, input.key);
    return saved;
  }

  async deleteSetting(category: SettingCategory, key: string) {
    const setting = await this.settingsRepository.findOne({
      where: { category, key },
    });

    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    await this.settingsRepository.remove(setting);
    this.clearCache(category, key);
  }

  async initializeDefaults() {
    const defaults: SettingInput[] = [
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'apiUrl',
        value: 'https://secure.3gdirectpay.com/payv3.php',
      },
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'companyToken',
        value: '',
        type: SettingType.ENCRYPTED,
        isSensitive: true,
      },
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'serviceType',
        value: '5525',
      },
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'redirectUrl',
        value: 'http://localhost:3000/checkout/success',
      },
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'backUrl',
        value: 'http://localhost:3000/checkout',
      },
      {
        category: SettingCategory.PAYMENT_DPO,
        key: 'isEnabled',
        value: true,
        type: SettingType.BOOLEAN,
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'bankName',
        value: 'Standard Chartered Bank',
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'accountNumber',
        value: '',
        type: SettingType.ENCRYPTED,
        isSensitive: true,
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'accountName',
        value: 'Shreeji Investments Ltd',
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'swiftCode',
        value: '',
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'iban',
        value: '',
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'deadlineHours',
        value: 24,
        type: SettingType.NUMBER,
      },
      {
        category: SettingCategory.PAYMENT_BANK_TRANSFER,
        key: 'isEnabled',
        value: true,
        type: SettingType.BOOLEAN,
      },
    ];

    for (const setting of defaults) {
      const exists = await this.settingsRepository.findOne({
        where: { category: setting.category, key: setting.key },
      });
      if (!exists) {
        await this.upsertSetting(setting);
      }
    }
  }
}


