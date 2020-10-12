import { defaultsDeep } from 'lodash';

export class Motm {
  id: number;
  rate: number;
  title: string;
  message: string;
  date: string;

  constructor(motm?: Partial<Motm>) {
    defaultsDeep(this, motm);
  }
}
