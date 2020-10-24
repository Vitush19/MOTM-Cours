import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Mail } from '../models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private url: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getMail(): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${this.url}/mails`).pipe(timeout(10000));
  }

  addMail(mail: Mail): Observable<Mail> {
    return this.http.post<any>(`${this.url}/mails`, mail).pipe(timeout(10000));
  }
}
