import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeUserEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
