import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getTemplate(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.url}/templates`).pipe(timeout(10000));
  }

  addTemplate(template: Template): Observable<Template> {
    return this.http.post<any>(`${this.url}/templates`, template).pipe(timeout(10000));
  }

  deleteTemplate(id: number): Observable<any> {
    return this.http.delete(`${this.url}/templates/${id}`).pipe(timeout(10000));
  }

}
