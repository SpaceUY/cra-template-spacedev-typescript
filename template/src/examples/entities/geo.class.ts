import { IsString } from 'class-validator';

export class Geo {
  @IsString()
  lat!: string;

  @IsString()
  lng!: string;
}
