import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { differenceInCalendarDays } from 'date-fns';
import * as moment from 'moment';

@Component({
    templateUrl: './deal.component.html'
})

export class DealComponent implements OnInit {
    branchUser: any = '';
    loading = false;
    pageSize = 10;
    dateFormat = 'dd/MM/yyyy';
    searchDate = new Date();
    pageIndex = 1;
    total = 0;
    lastIdx: any = '';
    arrayHNX:any = [];
    totalQty: any = '';
    valueHoseBos: any = 0;
    valueHoseVSD: any = 0;
    valueHnxBos: any = 0;
    valueHnxVSD: any = 0;
    valueUpcomBos: any = 0;
    valueUpcomVSD: any = 0;
    loadingSearch = false;
    checkfail = false;
    constructor(
        private paymentService: PaymentService,
        private nzMessageService: NzMessageService
    ) {
    }

    ngOnInit(): void {
        let users = JSON.parse(localStorage.getItem('user')) || [];
        console.log(users, 'users');
    }

    compareFile(): void {
        const date = moment(new Date(this.searchDate)).format('YYYYMMDD');
        console.log(date, "searchDate");
        this.loadingSearch = true;
        this.paymentService.compareFileDeal(date).subscribe(result => {
            console.log(result, 'result');

            if(result.success) {
                this.checkfail = false;
                this.loadingSearch = false;
                this.arrayHNX = [];
                this.totalQty = 0;
                if(result.result.rsHnx.resultHnxC.length > 0) {
                    this.arrayHNX = result.result.rsHnx.resultHnxC;
                    console.log(this.arrayHNX, 'this.arrayHNX');
                    for(const i of this.arrayHNX) {
                        this.totalQty += parseInt(i.qty);
                    }
                    this.checkfail = true;
                }
                this.valueHoseBos = result.result.rsHose.totalHoseBos;
                this.valueHoseVSD = result.result.rsHose.totalHoseVSD;
                this.valueHnxBos = result.result.rsHnx.totalHnxBos;
                this.valueHnxVSD = result.result.rsHnx.totalHnxVSD;
                this.valueUpcomBos = result.result.rsUpcom.totalUpcomBos;
                this.valueUpcomVSD = result.result.rsUpcom.totalUpcomVSD;
            } else {
                this.nzMessageService.create('info', result.message);
                this.loadingSearch = false;
            }
            // this.modalService.closeAll();
            // this.resetDepositModal();
        });
    }

    disabledDate = (current: Date): boolean => differenceInCalendarDays(current, this.searchDate) > 0;
    
    
    formatterNumber = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

}