import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly algorithm = 'aes-256-cbc';
  private readonly encryptionKey: Buffer;

  constructor(private readonly configService: ConfigService) {
    let key = this.configService.get<string>('ENCRYPTION_KEY') || 'default-key-change-in-production-32chars!!';

    if (key.length < 32) {
      key = key.padEnd(32, '0');
    } else if (key.length > 32) {
      key = key.substring(0, 32);
    }

    this.encryptionKey = Buffer.from(key, 'utf8');
  }

  encrypt(plainText: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
      let encrypted = cipher.update(plainText, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return `${iv.toString('hex')}:${encrypted}`;
    } catch (error) {
      this.logger.error('Encryption failed', error as Error);
      throw new Error('Failed to encrypt data');
    }
  }

  decrypt(cipherText: string): string {
    try {
      const [ivHex, encrypted] = cipherText.split(':');
      if (!ivHex || !encrypted) {
        throw new Error('Invalid encrypted string');
      }
      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      this.logger.error('Decryption failed', error as Error);
      throw new Error('Failed to decrypt data');
    }
  }

  isEncrypted(value: string | null | undefined): boolean {
    if (!value) return false;
    return value.includes(':');
  }
}


