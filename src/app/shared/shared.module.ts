import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { AiChatboxComponent } from './components/ai-chatbox/ai-chatbox.component';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        NzIconModule,
        NzCardModule,
        NzGridModule,
        NzStatisticModule,
        PerfectScrollbarModule,
        SearchPipe,
        NzNotificationModule,
        AiChatboxComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        NzIconModule,
        NzCardModule,
        NzGridModule,
        NzStatisticModule,
        NzToolTipModule,
        NzAvatarModule,
        NzButtonModule,
        NzInputModule,
        PerfectScrollbarModule,
        CKEditorModule
    ],
    declarations: [
        SearchPipe,
        AiChatboxComponent
    ],
    providers: [
        ThemeConstantService
    ]
})

export class SharedModule { }
