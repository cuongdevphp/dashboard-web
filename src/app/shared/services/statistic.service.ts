import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StatisticService {

  constructor(
      private http: HttpClient
  ) {

  }

  getSessionLogin(startDate, endDate, startWeekDate, endWeekDate) {
    return this.http.get<any>(`http://10.10.10.13:3001/statistic/sessionLogin?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}&startWeekDate=${new Date(startWeekDate).toISOString()}&endWeekDate=${new Date(endWeekDate).toISOString()}`);
  }
}
