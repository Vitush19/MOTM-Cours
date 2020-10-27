import { defaultsDeep } from 'lodash';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  age = new Date();
  mail: string;
  mailList: number[];

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
