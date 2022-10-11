import { IsString } from 'class-validator';
import { BaseDto } from 'utilities/http/base.dto';

export class CompanyDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  catchPhrase: string;

  @IsString()
  bs: string;

  constructor(data: any) {
    super(data);

    this.name = data.name;
    this.catchPhrase = data.catchPhrase;
    this.bs = data.bs;
  }
}
