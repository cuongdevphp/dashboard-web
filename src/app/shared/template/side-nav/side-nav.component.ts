import { Component } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { cloneDeep } from "lodash";
@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    public menuItems: any[]
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;

    constructor( private themeService: ThemeConstantService) {}

    ngOnInit(): void {
        let user = JSON.parse(localStorage.getItem('user')) || [];
        const routes = cloneDeep(ROUTES);
        // console.log(ROUTES, 'ROUTES');
        console.log(routes, 'routes');
        console.log(user.department, 'user.department');
        // return;
        switch(user.department) {
            case 'CS': 
                routes.splice(0, 3);
                routes.splice(1, 1);
                // routes.splice(0, 2);
                break;
            case 'HR': 
                routes.splice(0, 4);
                break;
            case null: // Broker
                routes.splice(0, 2);
                routes.splice(1, 1);
                break;
            case 'AC': // ACC
                routes.splice(1, 3);
                routes[0].submenu = routes[0].submenu.filter(function( obj ) {
                    return obj.path === '/dashboard/report';
                });
                break;
            default:
                break;
        }
        // if(user.department === 'CS') {
        //     routes.splice(0, 2);
        // }
        // const menuUser = typeof user.menu !== 'undefined' ? JSON.parse(user.menu) : '';
        // if(menuUser) {
        //     for(const i of ROUTES) {
        //         let subMenu = [];
        //         for(const y in i.submenu) {
        //             if(menuUser.includes(i.submenu[y].name)) {
        //                 subMenu.push(i.submenu[y]);
        //             }
        //         }
        //         i.submenu = subMenu;
        //     }
        // }
        console.log(routes, 'routes');
        this.menuItems = routes.filter(menuItem => menuItem);
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
    }

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}
