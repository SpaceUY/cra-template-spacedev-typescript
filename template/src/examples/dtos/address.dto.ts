import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';
import { GeoDto } from './geo.dto';

export class AddressDto extends BaseDto {
  @IsString()
  street!: string;

  @IsString()
  suite!: string;

  @IsString()
  city!: string;

  @IsString()
  zipcode!: string;

  @ValidateNested()
  @Type(() => GeoDto)
  geo!: GeoDto;

  constructor(data: any) {
    super();

    Object.assign(this, data);

    this.geo = new GeoDto(data.geo);
  }
}
