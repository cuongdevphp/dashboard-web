import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { MessageIncom } from '../_models/message-incom';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private messageSubject: BehaviorSubject<MessageIncom>;
  public message: Observable<MessageIncom>;

  constructor(
      private http: HttpClient
  ) {

  }

  public get messageValue(): MessageIncom {
      return this.messageSubject.value;
  }
  
  getQtyAccount(startDate, endDate) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/qtyAccount?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`);
  }

  getQtyAccountTrade(startDate, endDate) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/qtyAccountTrade?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`);
  }

  getQtyAccountTradeDerivative(startDate, endDate) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/qtyAccountTradeDerivative?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`);
  }

  getCommission(startDate, endDate) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/commission?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`);
  }

  getTradingListedSecurities(startDate, endDate) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/tradingListedSecurities?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}`);
  }
  
  getTradingReport(pageIndex, pageSize, status, type, stockCode, accountNumber, branch, room, date) {
    return this.http.get<any>(`${environment.apiUrl}/report/orderStock?offset=${pageIndex}&page=${pageSize}&status=${status}&type=${type}&date=${date}&accountNumber=${accountNumber}&stockCode=${stockCode}&branch=${branch}&room=${room}`);
  }

  getListStockListMargin(searchDate, filterIndustry) {
    return this.http.get<any>(`http://10.10.25.150:3002/report/getListStockListMargin?searchDate=${searchDate}&industry=${filterIndustry}`);
  }
}