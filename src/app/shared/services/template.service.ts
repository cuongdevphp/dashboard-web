import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { MessageIncom } from '../_models/message-incom';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  private messageSubject: BehaviorSubject<MessageIncom>;
  public message: Observable<MessageIncom>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {

  }

  public get messageValue(): MessageIncom {
      return this.messageSubject.value;
  }

  getTemplates(pageIndex, pageSize) {
    return this.http.get<any>(`http://10.10.10.13:3001/template/email?offset=${pageIndex}&page=${pageSize}`);
  }

  deleteUser(id, isActive) {
    const params = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        isActive
      },
    };
    return this.http.delete<any>(`http://10.10.10.13:3001/internal/user/${id}`, params)
  }

  updateTemplate(id, body) {
    const params = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      ...body,
    };
    return this.http.post<any>(`http://10.10.10.13:3001/template/email/${id}`, params)
  }

  createUser(params) {
    return this.http.post<any>(`http://10.10.10.13:3001/internal/user`, { ...params })
  }
}
