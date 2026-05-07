import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositComponent } from './deposit/deposit.component';
import { DealComponent } from './deal/deal.component';

const routes: Routes = [
    {
        path: 'deposit',
        component: DepositComponent,
        data: {
            title: 'deposit'
        }
    },
    {
        path: 'deal',
        component: DealComponent,
        data: {
            title: 'deal'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CsRoutingModule { }
