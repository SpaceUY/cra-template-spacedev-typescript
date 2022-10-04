import { IsString } from 'class-validator';
import { wait } from 'helpers/nodash.helpers';
import { redact } from 'helpers/text.helpers';
import { http } from 'utilities/http/http';
import { ResponseValidator } from 'utilities/http/validator/response-validator.class';
import { logger } from 'utilities/logger/Logger';

class User {
  @IsString()
  name!: string;
}

export async function login(email: string, password: string): Promise<string> {
  try {
    await http.post('/login', { email, password });
  } catch (error) {
    logger.warn('Failed request for demo purposes', {
      path: '/login',
      email: redact(email, 3),
      password: redact(password),
    });
  }

  await wait(500);

  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7Im5hbWUiOiJUeWxlciBEdXJkZW4ifX0.M8phaiYgptHZt0AhrtrctE2AkwV9trqh_IsJMoRvOks';
}

export async function getUserInfo(): Promise<{ name: string }> {
  try {
    await http.get('/user/info', new ResponseValidator(User));
  } catch (error) {
    logger.warn('Failed request for demo purposes', {
      path: '/user/info',
    });
  }

  await wait(300);

  return {
    name: 'Tyler Durden',
  };
}
