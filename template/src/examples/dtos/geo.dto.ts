import { IsString } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';

export class GeoDto extends BaseDto {
  @IsString()
  lat: string;

  @IsString()
  lng: string;

  constructor(data: any) {
    super(data);

    this.lat = data.lat;
    this.lng = data.lng;
  }
}
