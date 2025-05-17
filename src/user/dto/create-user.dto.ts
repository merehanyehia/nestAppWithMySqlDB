import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be string' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'please provide the First Name' })
  @MinLength(3, { message: 'min length must be 3' })
  firstName: string;

  @IsString({ message: 'Must be string' })
  @IsNotEmpty({ message: 'please provide the Last Name' })
  @MinLength(3, { message: 'min length must be 3' })
  lastName: string;
}
