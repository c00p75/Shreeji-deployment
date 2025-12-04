import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StrapiService {
  private readonly baseUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('STRAPI_URL') || 'http://localhost:1337';
    this.apiToken = this.configService.get<string>('STRAPI_API_TOKEN') || '';
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
    };
  }

  async get<T>(path: string, options?: { params?: any }): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/api${path}`, {
        headers: this.getHeaders(),
        params: options?.params,
      })
    );
    return response.data;
  }

  async post<T>(path: string, data: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api${path}`, data, {
        headers: this.getHeaders(),
      })
    );
    return response.data;
  }

  async put<T>(path: string, data: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.put(`${this.baseUrl}/api${path}`, data, {
        headers: this.getHeaders(),
      })
    );
    return response.data;
  }

  async delete<T>(path: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/api${path}`, {
        headers: this.getHeaders(),
      })
    );
    return response.data;
  }
}

