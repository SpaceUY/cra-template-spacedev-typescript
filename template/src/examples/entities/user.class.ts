import { Address } from './address.class';
import { Company } from './company.class';

export class User {
  id!: number;
  name!: string;
  username!: string;
  email!: string;
  address!: Address;
  pone!: string;
  website!: string;
  company!: Company;
}
