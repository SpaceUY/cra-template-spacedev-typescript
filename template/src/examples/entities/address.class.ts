import { IsString } from 'class-validator';
import { Geo } from './geo.class';

export class Address {
  @IsString()
  street!: string;

  @IsString()
  suite!: string;

  @IsString()
  city!: string;

  @IsString()
  zipcode!: string;

  geo!: Geo;
}
