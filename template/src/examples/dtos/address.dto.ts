import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';
import { GeoDto } from './geo.dto';

export class AddressDto extends BaseDto {
  @IsString()
  street: string;

  @IsString()
  suite: string;

  @IsString()
  city: string;

  @IsString()
  zipcode: string;

  @ValidateNested()
  @Type(() => GeoDto)
  geo: GeoDto;

  constructor(data: any) {
    super(data);

    this.street = data.street;
    this.suite = data.suite;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.geo = new GeoDto(data.geo);
  }
}
