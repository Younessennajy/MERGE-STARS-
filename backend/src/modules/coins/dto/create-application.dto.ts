import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CoinType } from '../../../common/enums/coin-type.enum';

export class CreateApplicationDto {
  @IsEnum(CoinType)
  coinType: CoinType;

  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  specialRequest?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  financingTerm?: number;
}
