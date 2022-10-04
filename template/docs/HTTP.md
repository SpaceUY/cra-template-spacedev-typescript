Create React App Starter Template by:

[![SpaceDev](https://uploads-ssl.webflow.com/61e097dd988731696768be21/62042f55a072ef02ab1d11a2_logo%20del%20mismo%20taman%CC%83o%20que%20el%20texto.svg)](https://www.spacedev.io/)

**[Go Back](../README.md)**

# HTTP requests

**Use the utility `http`**

```typescript
class Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

...

http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  .then((data) => console.log('data', data))
  .catch(genericErrorHandler);
```

## Response validation

> **Note** By default the validation errors will be logged as warnings, if you prefer to see errors you can change that behavior with an environment variable. See [Environment Configuration](#environment-configuration)

```typescript
class Todo {
  @IsNumber()
  userId!: number; // the ! operator is necessary because we are declaring uninitialized variables

  @IsNumber()
  id!: number;

  @IsString()
  title!: string;

  @IsBoolean()
  completed!: boolean;
}

...

const responseValidator = new ResponseValidator(
  Todo,
  { validateList: true }, // this options will comunicate to the validation process that the  validations should be done over a list of objects with type Todo. If the response only returns a single object omit the option.
);

...

http.get<Todo[]>(
  'https://jsonplaceholder.typicode.com/todos',
  responseValidator,
)
  .then((data) => console.log('data', data))
  .catch(genericErrorHandler);

...

http.post<Todo[]>(
  'https://jsonplaceholder.typicode.com/todos',
  { /* Todo data */ },
  responseValidator,
)
  .then((data) => console.log('data', data))
  .catch(genericErrorHandler);
```

## Validation examples

```typescript
class Employee {
  @IsString()
  name!: string; // required string

  @IsDateString()
  createdAt!: Date; // required string date

  @IsDateString()
  @IsOptional()
  deletedAt?: Date; // optional string date
}

class Company {
  @IsString()
  name!: string; // required string

  @IsDateString()
  createdAt!: Date; // required string date

  @IsDateString()
  @IsOptional()
  deletedAt?: Date; // optional string date

  @IsArray()
  @ValidateNested()
  employees!: Employee[]; // required array of employees with nested validation to make sure all items are compliant
}
```
