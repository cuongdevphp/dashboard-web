import { Component, OnInit } from '@angular/core';
import { IncomService } from 'src/app/shared/services/incom.service';
import * as XLSX from 'xlsx';
@Component({
    templateUrl: './al.component.html'
})

export class AlComponent implements OnInit {
    constructor(
        private incomService: IncomService,
    ) {
        //this.displayData = this.productsList
    }

    ngOnInit(): void {
        // let users = JSON.parse(localStorage.getItem('user')) || [];
        // console.log(users, 'users');
        // this.branchUser = users.branch;
        // this.loadWithdrawList(this.pageIndex, this.pageSize, this.bankCode, this.selectedType, this.selectedStatus, this.searchDate[0], this.searchDate[1]);
        // this.loadBanks();
    }

    excelData: any[];

    onFileChange(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log('Excel data:', this.excelData);
        this.incomService.sendMultipleMessage({ params: this.excelData}).subscribe(result => {
            
            setTimeout(function () {
                window.open(`http://10.10.10.13:3001/assets/excel/${result.result}`);
            }, 1000);
        });

      };
      reader.readAsBinaryString(file);
    }
}