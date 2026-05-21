import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApplicationStatus } from '../../../common/enums/application-status.enum';

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  note?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  rejectionNote?: string;
}
