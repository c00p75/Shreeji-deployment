import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode?: string;
  iban?: string;
}

@Injectable()
export class BankDetailsConfig {
  constructor(private readonly configService: ConfigService) {}

  getBankDetails(): BankDetails {
    return {
      bankName: this.configService.get<string>('BANK_NAME') || 'Standard Chartered Bank',
      accountNumber: this.configService.get<string>('BANK_ACCOUNT_NUMBER') || '1234567890',
      accountName: this.configService.get<string>('BANK_ACCOUNT_NAME') || 'Shreeji',
      swiftCode: this.configService.get<string>('BANK_SWIFT_CODE'),
      iban: this.configService.get<string>('BANK_IBAN'),
    };
  }

  getPaymentDeadlineHours(): number {
    return parseInt(this.configService.get<string>('BANK_TRANSFER_DEADLINE_HOURS') || '24', 10);
  }
}

