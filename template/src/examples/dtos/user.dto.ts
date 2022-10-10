import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class UserDto extends BaseDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @ValidateNested()
  address!: AddressDto;

  @IsString()
  phone!: string;

  @IsString()
  website!: string;

  @ValidateNested()
  company!: CompanyDto;

  constructor(data: any) {
    super();

    Object.assign(this, data);

    this.address = new AddressDto(data.address);
    this.company = new CompanyDto(data.company);
  }
}
