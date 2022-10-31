Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# HTTP requests

## Wihtout Validation

**Use the utility `http`**

```typescript
class AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
}

class GeoDto {
  lat: string;
  lng: string;
}

class CompanyDto {
  name: string;
  catchPhrase: string;
  bs: string;
}

class UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: AddressDto;
  company: CompanyDto;
}
...

useEffect(() => {
  http
    .get<UserDto[]>(
      'https://jsonplaceholder.typicode.com/users',
    )
    .then((users) =>
      // do stuff
    )
    .catch(genericErrorHandler);
}, []);
```

## With Validation

> **Note** By default the validation errors will be logged as warnings and the response allowed to continue, if you prefer to see errors and make the request fail you can change that behavior with an environment variable. See [Environment Configuration](../README.md#environment-configuration)

```typescript
class GeoDto extends BaseDto {
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

class AddressDto extends BaseDto {
  @IsString()
  street: string;

  @IsString()
  suite: string;

  @IsString()
  city: string;

  @IsString()
  zipcode: string;

  @ValidateNested()
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

class CompanyDto extends BaseDto {
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

class UserDto extends BaseDto {
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

...

const responseValidator = new ResponseValidator(
  UserDto,
  { validateList: true }, // this option will comunicate to the validation process that the validations should be done over a list of objects with type Todo. If the response only returns a single object omit the option.
);

...

useEffect(() => {
  http
    .get<UserDto[]>(
      'https://jsonplaceholder.typicode.com/users',
      new ResponseValidator(UserDto, {
        validateList: true,
      }),
    )
    .then((users) =>
      console.info('users:', users.map((item) => item.name).join(', ')),
    )
    .catch(genericErrorHandler);
}, []);
```
