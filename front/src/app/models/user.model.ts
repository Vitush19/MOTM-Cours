import { defaultsDeep } from 'lodash';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age = new Date();

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
