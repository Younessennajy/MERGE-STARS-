import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class AddApplicationDocumentDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsUrl()
  fileUrl: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  type?: string;
}
