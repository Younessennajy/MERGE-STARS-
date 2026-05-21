import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 80)
  sku?: string;

  @IsOptional()
  @IsString()
  @Length(0, 5000)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceUsd: number;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  metalType?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  weightGrams?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  purity?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
