import { defaultsDeep } from 'lodash';

export class Mail {
  id: number;
  note: number;
  comment: string;
  date: Date;
  mail: string;

  constructor(mail?: Partial<Mail>) {
    defaultsDeep(this, mail);
  }
}
