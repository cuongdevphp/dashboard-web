import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CodeBoxComponent } from './code-box.component';

@NgModule({
  declarations: [CodeBoxComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    NzMessageModule
  ],
  exports: [CodeBoxComponent]
})
export class CodeBoxModule { }
