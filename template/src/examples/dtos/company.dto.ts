import { IsString } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';

export class CompanyDto extends BaseDto {
  @IsString()
  name!: string;

  @IsString()
  catchPhrase!: string;

  @IsString()
  bs!: string;

  constructor(data: unknown) {
    super();

    Object.assign(this, data);
  }
}
