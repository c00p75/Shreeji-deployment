import { IsNumber, IsOptional, Min } from 'class-validator';

export class AddCartItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsOptional()
  variantId?: number;
}

