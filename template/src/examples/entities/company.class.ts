import { IsString } from 'class-validator';

export class Company {
  @IsString()
  name!: string;

  @IsString()
  catchPhrase!: string;

  @IsString()
  bs!: string;
}
