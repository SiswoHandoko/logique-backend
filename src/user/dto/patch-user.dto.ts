import { IsEmail, IsString, IsArray, Validate, IsEnum, minLength, MinLength, MaxLength, IsOptional, IsNumberString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { IsMMYYFormat } from './custom-validation/mm-yy-format.validator';

enum CreditCardType {
  Platinum = 'Platinum',
  Silver = 'Silver',
  Gold = 'Gold',
  Titanium = 'Titanium',
}

export class PatchUserDto {
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()  
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  photos: string[];

  @IsOptional()
  @IsEnum(CreditCardType)
  @IsString()
  creditcard_type: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  creditcard_number: string;

  @IsOptional()
  @IsString()
  creditcard_name: string;

  @IsOptional()
  @IsString()
  @Validate(IsMMYYFormat)
  creditcard_expired: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  creditcard_cvv: string;
}
