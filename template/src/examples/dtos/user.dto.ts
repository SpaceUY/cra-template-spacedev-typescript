import { IsEmail, IsNumber, IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';
import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export class UserDto extends BaseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  website: string;

  @ValidateNested()
  address: AddressDto;

  @ValidateNested()
  company: CompanyDto;

  constructor(data: any) {
    super(data);

    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.phone = data.phone;
    this.website = data.website;
    this.address = new AddressDto(data.address);
    this.company = new CompanyDto(data.company);
  }
}
