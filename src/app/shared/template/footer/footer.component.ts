import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {
    user:any = null;

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user')) || [];
        //console.log(user, 'users cuong');
        // console.log(sEmployee, 'sEmployee');
    }
}
