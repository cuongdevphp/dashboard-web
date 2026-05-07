import { Component, OnInit, HostListener } from '@angular/core';
import * as moment from 'moment';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ReportService } from 'src/app/shared/services/report.service';
declare var $: any; // JQuery
@Component({
    templateUrl: './sales.component.html'
})

export class SalesComponent implements OnInit {
    allChecked:boolean = false;
    loading = false;
    pageSize = 10;
    pageIndex = 1;
    
    dateFormat = 'dd/MM/yyyy';
    searchDate = new Date();
    total = null;
    sales:any = null;
    selectedStatus: any = '';
    searchAccountNumber: any = '';
    searchStockCode: any = '';
    
    users:any = null;
    searchUser: any = '';
    searchRoom: any = '';
    searchBranch: any = '';
    searchBuySell: any = '';
    searchStatus: any = '';
    totalSellVolumn: any = '';
    totalBuyVolumn: any = '';
    totalSellValue: any = '';
    totalBuyValue: any = '';
    loadingSearch = false;

    filterRoomData: any = ['001-01', '001-02', '001-03', '001-04', '001-05', '001-06', '001-07', '001-08', '001-09', '001-10', '002-01', '002-02', '002-03', '002-04', '002-05', '002-06'];
    filterUserData: any = null;
    filterBranchData: any = ['001', '002'];
    filterBuySellData: any = ['Mua', 'Bán'];
    filterStatusData: any = ['Khớp toàn bộ', 'Khớp 1 phần', 'Chờ khớp', 'Chờ xử lý', 'Tiếp nhận', 'Từ chối'];
    
    constructor(
        private reportService: ReportService,
    ) {
        //this.displayData = this.productsList
    }

    ngOnInit(): void {
        let users = JSON.parse(localStorage.getItem('user')) || [];
        // console.log(users, 'users');
        const sEmployee = users.username;
        // console.log(sEmployee, 'sEmployee');
    }
    
    @HostListener('document:keydown.enter', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.paramsFilterChange();
    }

    paramsFilterChange(): void {
        this.pageSize = 10;
        this.pageIndex = 1;
        if(this.searchRoom === 'All') {
            this.searchRoom = '';
        }
        if(this.searchBranch === 'All') {
            this.searchBranch = '';
        }
        if(this.searchBuySell === 'All') {
            this.searchBuySell = '';
        }
        if(this.searchStatus === 'All') {
            this.searchStatus = '';
        }
        this.loadReportTradingList(this.pageIndex, this.pageSize, this.searchStatus, this.searchBuySell, this.searchStockCode, this.searchAccountNumber, this.searchBranch, this.searchRoom, this.searchDate);
    }

    onQueryParamsChange(params: NzTableQueryParams): void {
        const { pageSize, pageIndex } = params;
        // console.log(params, 'params');
        this.loadReportTradingList(pageIndex, pageSize, this.searchStatus, this.searchBuySell, this.searchStockCode, this.searchAccountNumber, this.searchBranch, this.searchRoom, this.searchDate);
    }

    loadReportTradingList(
        pageIndex: number,
        pageSize: number,
        status: string,
        type: string,
        stockCode: number,
        accountNumber: number,
        branch: string,
        room: string,
        searchDate: Date | null,
    ): void {
        let page = 0;
        if(pageIndex !== 1) {
            page = pageSize * (pageIndex - 1);
        }
        this.loading = true;
        const date = moment(new Date(searchDate)).format('YYYYMMDD');
        switch(type) {
            case 'Mua':
                type = '2';
                break;
            case 'Bán':
                type = '1';
                break;
            default:
                type ='';
                break;
        }
        switch(status) {
            case 'Khớp 1 phần':
                status = '5';
                break;
            case 'Khớp toàn bộ':
                status = '4';
                break;
            case 'Chờ khớp':
                status = '3';
                break;
            case 'Chờ xử lý':
                status = '1';
                break;
            case 'Tiếp nhận':
                status = '2';
                break;
            case 'Từ chối':
                status = 'X';
                break;
            default:
                status ='';
                break;
        }
        console.log(type, 'typetype');
        this.reportService.getTradingReport(page, pageSize, status, type, stockCode, accountNumber, branch, room, date)
        .subscribe(result => {
            if(result.success) {
                this.loading = false;
                this.sales = result.data.data;
                console.log(this.sales, 'this.sales');
                this.total = result.data.total;
                this.pageSize = pageSize;
                this.pageIndex = pageIndex;
                this.totalBuyValue = result.data.totalBuyValue;
                this.totalBuyVolumn = result.data.totalBuyVolumn;
                this.totalSellValue = result.data.totalSellValue;
                this.totalSellVolumn = result.data.totalSellVolumn;
            }
        });
    }

    convertDDMM = (date) => {
        return `${date.substring(6, 8)}${date.substring(4, 6)}`;
    }

    parseInt = (num) => {
        return parseInt(num);
    }
}