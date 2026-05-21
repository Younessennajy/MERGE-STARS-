import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Equals,
} from 'class-validator';

export class RegisterDto {
  // ── Step 1: Personal Info ──
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  personalId: string;

  @IsOptional()
  @IsString()
  @Length(7, 30)
  phone?: string;

  // ── Step 2: Security ──
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/,
    {
      message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    },
  )
  password: string;

  // ── Step 3: Agreements ──
  @IsBoolean()
  @Equals(true, { message: 'You must accept the Terms & Conditions.' })
  acceptedTerms: boolean;

  @IsBoolean()
  @Equals(true, { message: 'You must accept the Financing Agreement.' })
  acceptedFinancingAgreement: boolean;

  @IsBoolean()
  @Equals(true, { message: 'You must confirm information accuracy.' })
  confirmedAccuracy: boolean;

  @IsOptional()
  @IsString()
  @Length(2, 10)
  region?: string;
}
