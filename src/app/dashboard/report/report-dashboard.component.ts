import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';

import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { differenceInCalendarDays } from 'date-fns';

import * as moment from 'moment';
declare var $: any; // JQuery
@Component({
    templateUrl: './report-dashboard.component.html',
    styleUrls: ['./report-dashboard.component.css']
})

export class ReportDashboardComponent implements OnInit {
    themeColors = this.colorConfig.get().colors;
    blue = this.themeColors.blue;
    blueLight = this.themeColors.blueLight;
    cyan = this.themeColors.cyan;
    cyanLight = this.themeColors.cyanLight;
    gold = this.themeColors.gold;
    purple = this.themeColors.purple;
    purpleLight = this.themeColors.purpleLight;
    red = this.themeColors.red;
    filterIndustry: any = '';

    allChecked:boolean = false;
    industryList: any = [
        {id: "00", value: "Bất động sản"},
        {id: "01", value: "Chăm sóc sức khỏe"},
        {id: "02", value: "Công nghệ thông tin"},
        {id: "03", value: "Công nghiệp"},
        {id: "04", value: "Dịch vụ tiện ích"},
        {id: "05", value: "Dịch vụ viễn thông"},
        {id: "06", value: "Khu vực tiêu dùng"},
        {id: "07", value: "Năng lượng"},
        {id: "08", value: "Nguyên vật liệu"},
        {id: "09", value: "Tài chính"},
        {id: "10", value: "Tiêu dùng thiết yếu"}
    ];
    loadingQtyAccount = false;
    loadingQtyAccountTrade = false;
    loadingQtyAccountTradeDerivative = false;
    loadingCommission = false;
    loadingTradingListedSecurities = false;
    loadingListStockListMargin = false;

    dateFormatQtyAcc = 'MM/yyyy';
    dateRangeQtyAcc = new Date(new Date().setMonth(new Date().getMonth() - 1));

    dateFormatQtyAccTrade = 'MM/yyyy';
    dateRangeQtyAccTrade = new Date(new Date().setMonth(new Date().getMonth() - 1));

    
    dateFormatQtyAccTradeDerivative = 'MM/yyyy';
    dateRangeQtyAccTradeDerivative = new Date(new Date().setMonth(new Date().getMonth() - 1));

    dateFormatCommission = 'MM/yyyy';
    dateMonthCommission = new Date(new Date().setMonth(new Date().getMonth() - 1));
    rsCommission: any = '';

    dateFormatTradingListedSecurities = 'MM/yyyy';
    dateMonthTradingListedSecurities = new Date(new Date().setMonth(new Date().getMonth() - 1));

    qtyAccountForeignOrgTradeDerivative:number = null;
    qtyAccountForeignPerTradeDerivative:number = null;
    qtyAccountVNOrgTradeDerivative:number = null;
    qtyAccountVNPerTradeDerivative:number = null;
    totalQtyAccountTradeDerivative: number = null;

    qtyAccountForeignOrgTrade:number = null;
    qtyAccountForeignPerTrade:number = null;
    qtyAccountVNOrgTrade:number = null;
    qtyAccountVNPerTrade:number = null;
    totalQtyAccountTrade: number = null;

    qtyAccountForeignOrg:number = null;
    qtyAccountForeignPer:number = null;
    qtyAccountVNOrg:number = null;
    qtyAccountVNPer:number = null;
    totalQtyAccount: number = null;

    
    rsQtyTotalBuyStockVN:number = null;
    rsQtyTotalSellStockVN:number = null;
    rsTotalValueBuyStockVN:number = null;
    rsTotalValueSellStockVN:number = null;
    rsTotalQtyBuyStockForeign:number = null;
    rsTotalQtySellStockForeign:number = null;
    rsTotalValueBuyStockForeign:number = null;
    rsTotalValueSellStockForeign:number = null;
    rsTotalQtyBuyBondVN:number = null;
    rsTotalQtySellBondVN:number = null;
    rsTotalValueBuyBondVN:number = null;
    rsTotalValueSellBondVN:number = null;
    rsTotalQtyBuyBondForeign:number = null;
    rsTotalQtySellBondForeign:number = null;
    rsTotalValueBuyBondForeign:number = null;
    rsTotalValueSellBondForeign:number = null;
    rsTotalQtyBuyFundVN:number = null;
    rsTotalQtySellFundVN:number = null;
    rsTotalValueBuyFundVN:number = null;
    rsTotalValueSellFundVN:number = null;
    rsTotalQtyBuyFundForeign:number = null;
    rsTotalQtySellFundForeign:number = null;
    rsTotalValueBuyFundForeign:number = null;
    rsTotalValueSellFundForeign:number = null;
    rsTotalQtyBuyWVN:number = null;
    rsTotalQtySellWVN:number = null;
    rsTotalValueBuyWVN:number = null;
    rsTotalValueSellWVN:number = null;
    rsTotalQtyBuyWForeign:number = null;
    rsTotalQtySellWForeign:number = null;
    rsTotalValueBuyWForeign:number = null;
    rsTotalValueSellWForeign:number = null;
    rsTotalQtyBuyDerivativeVN:number = null;
    rsTotalQtySellDerivativeVN:number = null;
    rsTotalValueBuyDerivativeVN:number = null;
    rsTotalValueSellDerivativeVN:number = null;
    rsTotalQtyBuyDerivativeForeign:number = null;
    rsTotalQtySellDerivativeForeign:number = null;
    rsTotalValueBuyDerivativeForeign:number = null;
    rsTotalValueSellDerivativeForeign:number = null;

    rsTotalQtyBuyProprietaryStock:number = null;
    rsTotalQtySellProprietaryStock:number = null;
    rsTotalValueBuyProprietaryStock:number = null;
    rsTotalValueSellProprietaryStock:number = null;
    rsTotalQtyBuyProprietaryBond:number = null;
    rsTotalQtySellProprietaryBond:number = null;
    rsTotalValueBuyProprietaryBond:number = null;
    rsTotalValueSellProprietaryBond:number = null;
    rsTotalQtyBuyProprietaryETF:number = null;
    rsTotalQtySellProprietaryETF:number = null;
    rsTotalValueBuyProprietaryETF:number = null;
    rsTotalValueSellProprietaryETF:number = null;
    rsTotalQtyBuyProprietaryW:number = null;
    rsTotalQtySellProprietaryW:number = null;
    rsTotalValueBuyProprietaryW:number = null;
    rsTotalValueSellProprietaryW:number = null;
    rsTotalQtyBuyProprietaryDerivative:number = null;
    rsTotalQtySellProprietaryDerivative:number = null;
    rsTotalValueBuyProprietaryDerivative:number = null;
    rsTotalValueSellProprietaryDerivative:number = null;
    
    rsTradeBuyStockPersonalVNHNX:number = null;
    rsTradeBuyStockPersonalVNHSX:number = null;
    rsTradeBuyStockPersonalVNUPCOM:number = null;
    rsTradeSellStockPersonalVNHNX:number = null;
    rsTradeSellStockPersonalVNHSX:number = null;
    rsTradeSellStockPersonalVNUPCOM:number = null;
    rsTradeBuyStockPersonalForeignHNX:number = null;
    rsTradeBuyStockPersonalForeignHSX:number = null;
    rsTradeBuyStockPersonalForeignUPCOM:number = null;
    rsTradeSellStockPersonalForeignHNX:number = null;
    rsTradeSellStockPersonalForeignHSX:number = null;
    rsTradeSellStockPersonalForeignUPCOM:number = null;
    rsTradeBuyFundCertificatePersonalVNHNX:number = null;
    rsTradeBuyFundCertificatePersonalVNHSX:number = null;
    rsTradeBuyFundCertificatePersonalVNUPCOM:number = null;
    rsTradeSellFundCertificatePersonalVNHNX:number = null;
    rsTradeSellFundCertificatePersonalVNHSX:number = null;
    rsTradeSellFundCertificatePersonalVNUPCOM:number = null;
    rsTradeBuyFundCertificatePersonalForeignHNX:number = null;
    rsTradeBuyFundCertificatePersonalForeignHSX:number = null;
    rsTradeBuyFundCertificatePersonalForeignUPCOM:number = null;
    rsTradeSellFundCertificatePersonalForeignHNX:number = null;
    rsTradeSellFundCertificatePersonalForeignHSX:number = null;
    rsTradeSellFundCertificatePersonalForeignUPCOM:number = null;
    rsTradeBuyStockOrgHNX:number = null;
    rsTradeBuyStockOrgHSX:number = null;
    rsTradeBuyStockOrgUPCOM:number = null;
    rsTradeSellStockOrgHNX:number = null;
    rsTradeSellStockOrgHSX:number = null;
    rsTradeSellStockOrgUPCOM:number = null;
    rsTradeBuyBondOrgHNX:number = null;
    rsTradeBuyBondOrgHSX:number = null;
    rsTradeBuyBondOrgUPCOM:number = null;
    rsTradeSellBondOrgHNX:number = null;
    rsTradeSellBondOrgHSX:number = null;
    rsTradeSellBondOrgUPCOM:number = null;
    rsTradeBuyFundCertificateOrgHNX:number = null;
    rsTradeBuyFundCertificateOrgHSX:number = null;
    rsTradeBuyFundCertificateOrgUPCOM:number = null;
    rsTradeSellFundCertificateOrgHNX:number = null;
    rsTradeSellFundCertificateOrgHSX:number = null;
    rsTradeSellFundCertificateOrgUPCOM:number = null;


    lstStockListMargin: any = null;
    totalMarginMoney: any = null;

    selectedStatus: any = '';
    searchPhone: any = '';
    phoneNumber: any = '';
    contentMessage: any = '';
    loadingSendModal = false;
    loadingSendMultipleModal = false;
    requiredForm: any = {
        phoneNumber: false,
        content: false
    };
    
    dateFormatStockListMargin = 'dd/MM/yyyy';
    searchDateStockListMargin = new Date(new Date().setDate(new Date().getDate() - 1));
    
    constructor(
        private reportService: ReportService,
        private colorConfig: ThemeConstantService
    ) {
        //this.displayData = this.productsList
    }

    ngOnInit(): void {
        const startOfMonthQtyAcc = moment(this.dateRangeQtyAcc).startOf('month').toISOString();
        const endOfMonthQtyAcc   = moment(this.dateRangeQtyAcc).endOf('month').toISOString();
        this.loadQtyAccount(startOfMonthQtyAcc, endOfMonthQtyAcc);
    }
    
    onChangTabs(args: any[]): void {
        switch (args[0].index) {
            case 0:
                const startOfMonthQtyAcc = moment(this.dateRangeQtyAcc).startOf('month').toISOString();
                const endOfMonthQtyAcc   = moment(this.dateRangeQtyAcc).endOf('month').toISOString();
                this.loadQtyAccount(startOfMonthQtyAcc, endOfMonthQtyAcc);
                break;
            case 1:
                const startOfMonthQtyAccTrades = moment(this.dateRangeQtyAccTrade).startOf('month').toISOString();
                const endOfMonthQtyAccTrade   = moment(this.dateRangeQtyAccTrade).endOf('month').toISOString();
                this.loadQtyAccountTrade(startOfMonthQtyAccTrades, endOfMonthQtyAccTrade);
                break;
            case 2:
                const startOfMonthQtyAccTradesDerivative = moment(this.dateRangeQtyAccTradeDerivative).startOf('month').toISOString();
                const endOfMonthQtyAccTradeDerivative    = moment(this.dateRangeQtyAccTradeDerivative).endOf('month').toISOString();
                this.loadQtyAccountTradeDerivative(startOfMonthQtyAccTradesDerivative, endOfMonthQtyAccTradeDerivative);
                break;
            default:
                break;
        }
    }

    onChangeDateRangeQtyAccTrade(result: Date): void {
        const startOfMonth = moment(result).startOf('month').toISOString();
        const endOfMonth   = moment(result).endOf('month').toISOString();
        this.loadQtyAccountTrade(startOfMonth, endOfMonth);
    }

    onChangeDateRangeQtyAcc(result: Date): void {
        const startOfMonth = moment(result).startOf('month').toISOString();
        const endOfMonth   = moment(result).endOf('month').toISOString();
        this.loadQtyAccount(startOfMonth, endOfMonth);
    }

    onChangeDateRangeQtyAccTradeDerivative(result: Date): void {
        const startOfMonth = moment(result).startOf('month').toISOString();
        const endOfMonth   = moment(result).endOf('month').toISOString();
        this.loadQtyAccountTradeDerivative(startOfMonth, endOfMonth);
    }

    clickLoadTradingListedSecurities() {
        const startOfMonthCommission = moment(this.dateMonthTradingListedSecurities).startOf('month').toISOString();
        const endOfMonthCommission   = moment(this.dateMonthTradingListedSecurities).endOf('month').toISOString();
        this.loadTradingListedSecurities(startOfMonthCommission, endOfMonthCommission);
    }

    clickLoadCommission() {
        const startOfMonthCommission = moment(this.dateMonthCommission).startOf('month').toISOString();
        const endOfMonthCommission   = moment(this.dateMonthCommission).endOf('month').toISOString();
        this.loadCommission(startOfMonthCommission, endOfMonthCommission);
    }

    clickLoadStockListMargin() {
        // console.log(this.searchDateStockListMargin, 'this.searchDateStockListMargin');
        const searchDate = moment(this.searchDateStockListMargin).format('YYYYMMDD');
        // console.log(start, end);
        this.loadListStockListMargin(searchDate, this.filterIndustry);
    }

    loadListStockListMargin(
        searchDate: string | null,
        filterIndustry: string | null
    ): void {
        this.loadingListStockListMargin = true;
        this.reportService.getListStockListMargin(searchDate, filterIndustry)
        .subscribe(result => {
            this.totalMarginMoney = result.totalMarginMoney;
            this.lstStockListMargin = result.result;
            this.loadingListStockListMargin = false;
        });
    }

    loadQtyAccount(
        startDate: string | null,
        endDate: string | null,
    ): void {
        this.loadingQtyAccount = true;
        this.reportService.getQtyAccount(startDate, endDate)
        .subscribe(result => {
            this.qtyAccountForeignOrg = result.rsQtyAccountForeignOrg;
            this.qtyAccountForeignPer = result.rsQtyAccountForeignPer;
            this.qtyAccountVNOrg = result.rsQtyAccountVNOrg;
            this.qtyAccountVNPer = result.rsQtyAccountVNPer;
            this.totalQtyAccount = this.qtyAccountForeignOrg + this.qtyAccountForeignPer + this.qtyAccountVNOrg + this.qtyAccountVNPer;
            this.loadingQtyAccount = false;
        });
    }

    loadQtyAccountTrade(
        startDate: string | null,
        endDate: string | null,
    ): void {
        this.loadingQtyAccountTrade = true;
        this.reportService.getQtyAccountTrade(startDate, endDate)
        .subscribe(result => {
            this.qtyAccountForeignOrgTrade = result.rsQtyAccountForeignOrg;
            this.qtyAccountForeignPerTrade = result.rsQtyAccountForeignPer;
            this.qtyAccountVNOrgTrade = result.rsQtyAccountVNOrg;
            this.qtyAccountVNPerTrade = result.rsQtyAccountVNPer;
            this.totalQtyAccountTrade = this.qtyAccountForeignOrgTrade + this.qtyAccountForeignPerTrade + this.qtyAccountVNOrgTrade + this.qtyAccountVNPerTrade;
            this.loadingQtyAccountTrade = false;
        });
    }

    loadQtyAccountTradeDerivative(
        startDate: string | null,
        endDate: string | null,
    ): void {
        this.loadingQtyAccountTradeDerivative = true;
        this.reportService.getQtyAccountTradeDerivative(startDate, endDate)
        .subscribe(result => {
            console.log(result, 'result');
            this.qtyAccountForeignOrgTradeDerivative = result.rsQtyAccountForeignOrg;
            this.qtyAccountForeignPerTradeDerivative = result.rsQtyAccountForeignPer;
            this.qtyAccountVNOrgTradeDerivative = result.rsQtyAccountVNOrg;
            this.qtyAccountVNPerTradeDerivative = result.rsQtyAccountVNPer;
            this.totalQtyAccountTradeDerivative = this.qtyAccountForeignOrgTradeDerivative + this.qtyAccountForeignPerTradeDerivative + this.qtyAccountVNOrgTradeDerivative + this.qtyAccountVNPerTradeDerivative;
            
            this.loadingQtyAccountTradeDerivative = false;
        });
    }
    
    loadCommission(
        startDate: string | null,
        endDate: string | null,
    ): void {
        this.loadingCommission = true;
        this.reportService.getCommission(startDate, endDate)
        .subscribe(result => {
            console.log(result, 'messages');
            this.rsQtyTotalBuyStockVN = result.stock.buyInMonth.volume.local;
            this.rsQtyTotalSellStockVN = result.stock.sellInMonth.volume.local;
            this.rsTotalValueBuyStockVN = result.stock.buyInMonth.value.local;
            this.rsTotalValueSellStockVN = result.stock.sellInMonth.value.local;
            this.rsTotalQtyBuyStockForeign = result.stock.buyInMonth.volume.foreign;
            this.rsTotalQtySellStockForeign = result.stock.sellInMonth.volume.foreign;
            this.rsTotalValueBuyStockForeign = result.stock.buyInMonth.value.foreign;
            this.rsTotalValueSellStockForeign = result.stock.sellInMonth.value.foreign;

            this.rsTotalQtyBuyBondVN = result.bond.buyInMonth.volume.local;
            this.rsTotalQtySellBondVN = result.bond.sellInMonth.volume.local;
            this.rsTotalValueBuyBondVN = result.bond.buyInMonth.value.local;
            this.rsTotalValueSellBondVN = result.bond.sellInMonth.value.local;
            this.rsTotalQtyBuyBondForeign = result.bond.buyInMonth.volume.foreign;
            this.rsTotalQtySellBondForeign = result.bond.sellInMonth.volume.foreign;
            this.rsTotalValueBuyBondForeign = result.bond.buyInMonth.value.foreign;
            this.rsTotalValueSellBondForeign = result.bond.sellInMonth.value.foreign;

            this.rsTotalQtyBuyFundVN = result.ETF.buyInMonth.volume.local;
            this.rsTotalQtySellFundVN = result.ETF.sellInMonth.volume.local;
            this.rsTotalValueBuyFundVN = result.ETF.buyInMonth.value.local;
            this.rsTotalValueSellFundVN = result.ETF.sellInMonth.value.local;
            this.rsTotalQtyBuyFundForeign = result.ETF.buyInMonth.volume.foreign;
            this.rsTotalQtySellFundForeign = result.ETF.sellInMonth.volume.foreign;
            this.rsTotalValueBuyFundForeign = result.ETF.buyInMonth.value.foreign;
            this.rsTotalValueSellFundForeign = result.ETF.sellInMonth.value.foreign;

            this.rsTotalQtyBuyWVN = result.W.buyInMonth.volume.local;
            this.rsTotalQtySellWVN = result.W.sellInMonth.volume.local;
            this.rsTotalValueBuyWVN = result.W.buyInMonth.value.local;
            this.rsTotalValueSellWVN = result.W.sellInMonth.value.local;
            this.rsTotalQtyBuyWForeign = result.W.buyInMonth.volume.foreign;
            this.rsTotalQtySellWForeign = result.W.sellInMonth.volume.foreign;
            this.rsTotalValueBuyWForeign = result.W.buyInMonth.value.foreign;
            this.rsTotalValueSellWForeign = result.W.sellInMonth.value.foreign;
            
            this.rsTotalQtyBuyDerivativeVN = result.derivative.buyInMonth.volume.local;
            this.rsTotalQtySellDerivativeVN = result.derivative.sellInMonth.volume.local;
            this.rsTotalValueBuyDerivativeVN = result.derivative.buyInMonth.value.local;
            this.rsTotalValueSellDerivativeVN = result.derivative.sellInMonth.value.local;
            this.rsTotalQtyBuyDerivativeForeign = result.derivative.buyInMonth.volume.foreign;
            this.rsTotalQtySellDerivativeForeign = result.derivative.sellInMonth.volume.foreign;
            this.rsTotalValueBuyDerivativeForeign = result.derivative.buyInMonth.value.foreign;
            this.rsTotalValueSellDerivativeForeign = result.derivative.sellInMonth.value.foreign;
            // ============================Tự doanh====================================
            this.rsTotalQtyBuyProprietaryStock = result.proprietary.stock.buyInMonth.volume;
            this.rsTotalQtySellProprietaryStock = result.proprietary.stock.sellInMonth.volume;
            this.rsTotalValueBuyProprietaryStock = result.proprietary.stock.buyInMonth.value;
            this.rsTotalValueSellProprietaryStock = result.proprietary.stock.sellInMonth.value;

            this.rsTotalQtyBuyProprietaryBond = result.proprietary.bond.buyInMonth.volume;
            this.rsTotalQtySellProprietaryBond = result.proprietary.bond.sellInMonth.volume;
            this.rsTotalValueBuyProprietaryBond = result.proprietary.bond.buyInMonth.value;
            this.rsTotalValueSellProprietaryBond = result.proprietary.bond.sellInMonth.value;

            this.rsTotalQtyBuyProprietaryETF = result.proprietary.ETF.buyInMonth.volume;
            this.rsTotalQtySellProprietaryETF = result.proprietary.ETF.sellInMonth.volume;
            this.rsTotalValueBuyProprietaryETF = result.proprietary.ETF.buyInMonth.value;
            this.rsTotalValueSellProprietaryETF = result.proprietary.ETF.sellInMonth.value;

            this.rsTotalQtyBuyProprietaryW = result.proprietary.W.buyInMonth.volume;
            this.rsTotalQtySellProprietaryW = result.proprietary.W.sellInMonth.volume;
            this.rsTotalValueBuyProprietaryW = result.proprietary.W.buyInMonth.value;
            this.rsTotalValueSellProprietaryW = result.proprietary.W.sellInMonth.value;

            this.rsTotalQtyBuyProprietaryDerivative = result.proprietary.derivative.buyInMonth.volume;
            this.rsTotalQtySellProprietaryDerivative = result.proprietary.derivative.sellInMonth.volume;
            this.rsTotalValueBuyProprietaryDerivative = result.proprietary.derivative.buyInMonth.value;
            this.rsTotalValueSellProprietaryDerivative = result.proprietary.derivative.sellInMonth.value;
            
            this.loadingCommission = false;
        });
    }
    
    loadTradingListedSecurities(
        startDate: string | null,
        endDate: string | null,
    ): void {
        this.loadingTradingListedSecurities = true;
        this.reportService.getTradingListedSecurities(startDate, endDate)
        .subscribe(result => {
            this.rsTradeBuyStockPersonalVNHNX = result.rsTradeBuyStockPersonalVNHNX;
            this.rsTradeBuyStockPersonalVNHSX = result.rsTradeBuyStockPersonalVNHSX;
            this.rsTradeBuyStockPersonalVNUPCOM = result.rsTradeBuyStockPersonalVNUPCOM;
            this.rsTradeSellStockPersonalVNHNX = result.rsTradeSellStockPersonalVNHNX;
            this.rsTradeSellStockPersonalVNHSX = result.rsTradeSellStockPersonalVNHSX;
            this.rsTradeSellStockPersonalVNUPCOM = result.rsTradeSellStockPersonalVNUPCOM;
            this.rsTradeBuyStockPersonalForeignHNX = result.rsTradeBuyStockPersonalForeignHNX;
            this.rsTradeBuyStockPersonalForeignHSX = result.rsTradeBuyStockPersonalForeignHSX;
            this.rsTradeBuyStockPersonalForeignUPCOM = result.rsTradeBuyStockPersonalForeignUPCOM;
            this.rsTradeSellStockPersonalForeignHNX = result.rsTradeSellStockPersonalForeignHNX;
            this.rsTradeSellStockPersonalForeignHSX = result.rsTradeSellStockPersonalForeignHSX;
            this.rsTradeSellStockPersonalForeignUPCOM = result.rsTradeSellStockPersonalForeignUPCOM;
            this.rsTradeBuyFundCertificatePersonalVNHNX = result.rsTradeBuyFundCertificatePersonalVNHNX;
            this.rsTradeBuyFundCertificatePersonalVNHSX = result.rsTradeBuyFundCertificatePersonalVNHSX;
            this.rsTradeBuyFundCertificatePersonalVNUPCOM = result.rsTradeBuyFundCertificatePersonalVNUPCOM;
            this.rsTradeSellFundCertificatePersonalVNHNX = result.rsTradeSellFundCertificatePersonalVNHNX;
            this.rsTradeSellFundCertificatePersonalVNHSX = result.rsTradeSellFundCertificatePersonalVNHSX;
            this.rsTradeSellFundCertificatePersonalVNUPCOM = result.rsTradeSellFundCertificatePersonalVNUPCOM;
            this.rsTradeBuyFundCertificatePersonalForeignHNX = result.rsTradeBuyFundCertificatePersonalForeignHNX;
            this.rsTradeBuyFundCertificatePersonalForeignHSX = result.rsTradeBuyFundCertificatePersonalForeignHSX;
            this.rsTradeBuyFundCertificatePersonalForeignUPCOM = result.rsTradeBuyFundCertificatePersonalForeignUPCOM;
            this.rsTradeSellFundCertificatePersonalForeignHNX = result.rsTradeSellFundCertificatePersonalForeignHNX;
            this.rsTradeSellFundCertificatePersonalForeignHSX = result.rsTradeSellFundCertificatePersonalForeignHSX;
            this.rsTradeSellFundCertificatePersonalForeignUPCOM = result.rsTradeSellFundCertificatePersonalForeignUPCOM;
            this.rsTradeBuyStockOrgHNX = result.rsTradeBuyStockOrgHNX;
            this.rsTradeBuyStockOrgHSX = result.rsTradeBuyStockOrgHSX;
            this.rsTradeBuyStockOrgUPCOM = result.rsTradeBuyStockOrgUPCOM;
            this.rsTradeSellStockOrgHNX = result.rsTradeSellStockOrgHNX;
            this.rsTradeSellStockOrgHSX = result.rsTradeSellStockOrgHSX;
            this.rsTradeSellStockOrgUPCOM = result.rsTradeSellStockOrgUPCOM;
            this.rsTradeBuyBondOrgHNX = result.rsTradeBuyBondOrgHNX;
            this.rsTradeBuyBondOrgHSX = result.rsTradeBuyBondOrgHSX;
            this.rsTradeBuyBondOrgUPCOM = result.rsTradeBuyBondOrgUPCOM;
            this.rsTradeSellBondOrgHNX = result.rsTradeSellBondOrgHNX;
            this.rsTradeSellBondOrgHSX = result.rsTradeSellBondOrgHSX;
            this.rsTradeSellBondOrgUPCOM = result.rsTradeSellBondOrgUPCOM;
            this.rsTradeBuyFundCertificateOrgHNX = result.rsTradeBuyFundCertificateOrgHNX;
            this.rsTradeBuyFundCertificateOrgHSX = result.rsTradeBuyFundCertificateOrgHSX;
            this.rsTradeBuyFundCertificateOrgUPCOM = result.rsTradeBuyFundCertificateOrgUPCOM;
            this.rsTradeSellFundCertificateOrgHNX = result.rsTradeSellFundCertificateOrgHNX;
            this.rsTradeSellFundCertificateOrgHSX = result.rsTradeSellFundCertificateOrgHSX;
            this.rsTradeSellFundCertificateOrgUPCOM = result.rsTradeSellFundCertificateOrgUPCOM;
            this.loadingTradingListedSecurities = false;
        });
    }

    previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
    
    disabledDateStockListMargin = (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0;
    disabledDateFormatCommission = (current: Date): boolean => differenceInCalendarDays(current, this.previousMonth) > 0;
    disabledDateFormattradingListedSecurities = (current: Date): boolean => differenceInCalendarDays(current, this.previousMonth) > 0;
    
    disabledDateFormatQtyAcc = (current: Date): boolean => differenceInCalendarDays(current, this.previousMonth) > 0;
    disabledDateFormatQtyAccTrade = (current: Date): boolean => differenceInCalendarDays(current, this.previousMonth) > 0;
    disabledDateFormatQtyAccTradeDerivative = (current: Date): boolean => differenceInCalendarDays(current, this.previousMonth) > 0;
}