import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CoinType } from '../../../common/enums/coin-type.enum';

export class PriceCalculatorDto {
  @IsEnum(CoinType)
  coinType: CoinType;

  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(90)
  @Max(100)
  metalPurity: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  financingTerm?: number;
}
