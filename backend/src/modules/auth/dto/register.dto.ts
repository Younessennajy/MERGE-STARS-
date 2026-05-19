import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(7, 30)
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  personalId: string;

  /**
   * Minimum 8 characters, at least one uppercase letter,
   * one lowercase letter, one digit, and one special character.
   */
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/,
    {
      message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    },
  )
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 10)
  region?: string;
}
