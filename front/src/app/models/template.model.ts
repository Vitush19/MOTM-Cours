import { defaultsDeep } from 'lodash';

export class Template {
  id: number;
  msgNote: string;
  title: string;

  constructor(template?: Partial<Template>) {
    defaultsDeep(this, template);
  }
}
