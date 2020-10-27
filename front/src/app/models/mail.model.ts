import { DatePipe } from '@angular/common';
import { defaultsDeep } from 'lodash';
import { User } from './user.model';

export class Mail {
  id: number;
  note: number;
  comment: string;
  date: Date;
  mail: string;
  user: User;

  constructor(mail?: Partial<Mail>) {
    defaultsDeep(this, mail);
  }
}
