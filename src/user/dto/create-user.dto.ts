import { IsEmail, IsString, IsArray, Validate, IsEnum, minLength, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomIsNotEmpty } from './custom-validation/not-empty.validator';
import { IsMMYYFormat } from './custom-validation/mm-yy-format.validator';

enum CreditCardType {
  Platinum = 'Platinum',
  Silver = 'Silver',
  Gold = 'Gold',
  Titanium = 'Titanium',
}

export class RegisterUserDto {
  @Validate(CustomIsNotEmpty, ['name'])
  @IsString()
  name: string;

  @Validate(CustomIsNotEmpty, ['address'])
  @IsString()
  address: string;

  @Validate(CustomIsNotEmpty, ['email'])
  @IsEmail()
  email: string;

  @Validate(CustomIsNotEmpty, ['password'])
  @IsString()
  password: string;

  @Validate(CustomIsNotEmpty, ['photos'])
  @IsArray()
  @Type(() => String)
  photos: string[];

  @Validate(CustomIsNotEmpty, ['creditcard_type'])
  @IsEnum(CreditCardType)
  @IsString()
  creditcard_type: string;

  @Validate(CustomIsNotEmpty, ['creditcard_number'])
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  creditcard_number: string;

  @Validate(CustomIsNotEmpty, ['creditcard_name'])
  @IsString()
  creditcard_name: string;

  @Validate(CustomIsNotEmpty, ['creditcard_expired'])
  @IsString()
  @Validate(IsMMYYFormat)
  creditcard_expired: string;

  @Validate(CustomIsNotEmpty, ['creditcard_cvv'])
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  creditcard_cvv: string;
}
