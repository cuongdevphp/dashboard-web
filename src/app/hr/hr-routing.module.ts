import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlComponent } from './al/al.component';

const routes: Routes = [
    {
        path: 'al',
        component: AlComponent,
        data: {
            title: 'al'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HrRoutingModule { }
