import { wait } from 'helpers/nodash.helpers';

export async function login(email: string, password: string): Promise<string> {
  await wait(500);

  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7Im5hbWUiOiJUeWxlciBEdXJkZW4ifX0.M8phaiYgptHZt0AhrtrctE2AkwV9trqh_IsJMoRvOks';
}

export async function getUserInfo(): Promise<{ name: string }> {
  await wait(300);

  return {
    name: 'Tyler Durden',
  };
}
