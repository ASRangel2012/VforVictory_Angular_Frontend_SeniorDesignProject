import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { environment } from 'environments/environment';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    collapse?: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank'
    },
    {
      path: '/services',
      title: 'Requests',
      icontype: 'nc-icon nc-box',
      type: 'sub',
<<<<<<< Updated upstream
      collapse: 'components',
      children: [
          {path: 'list', title: 'Service Requests', ab:'R'},
=======
      collapse: 'rcomponents',
      children: [
          {path: 'requests', title: 'Service Requests', ab:'R'},
>>>>>>> Stashed changes
          {path: 'vpizza', title: 'V Pizza History', ab:'VP'},
      ]
    },
    {
        path: '/family',
        title: 'Families',
        type: 'link',
        icontype: 'nc-icon nc-single-02'
    },
    {
        path: '/business',
        title: 'Businesses',
        icontype: 'nc-icon nc-shop',
        type: 'sub',
        collapse: 'components',
        children: [
            {path: 'list', title: 'Businesses', ab:'B'},
            {path: 'category', title: 'Categories', ab:'BC'},
        ]
    },
    {
      path: '/volunteers',
      title: 'Volunteers',
      type: 'link',
      icontype: 'nc-icon nc-badge'
    }

    /* ,{
        path: '/components',
        title: 'Components',
        type: 'sub',
        collapse: 'components',
        icontype: 'nc-icon nc-layout-11',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        collapse: 'forms',
        icontype: 'nc-icon nc-ruler-pencil',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        collapse: 'tables',
        icontype: 'nc-icon nc-single-copy-04',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        collapse: 'maps',
        icontype: 'nc-icon nc-pin-3',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'nc-icon nc-box'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'nc-icon nc-chart-bar-32'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'nc-icon nc-calendar-60'
    },{
        path: '/pages',
        title: 'Pages',
        collapse: 'pages',
        type: 'sub',
        icontype: 'nc-icon nc-book-bookmark',
        children: [
            {path: 'timeline', title: 'Timeline Page', ab:'T'},
            {path: 'user', title: 'User Page', ab:'UP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'}
        ]
    } */
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    public fullName: string;
    public username: string = null;
    public userId: string;
    public profilePictureURL: string = null;
    isNotMobileMenu(){
        if( window.outerWidth > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.fullName = JSON.parse(localStorage.getItem('currentUser')).first_name + ' ' +
        JSON.parse(localStorage.getItem('currentUser')).last_name;
        this.username = JSON.parse(localStorage.getItem('currentUser')).username;
        this.userId = JSON.parse(localStorage.getItem('currentUser')).record_id;
        if (JSON.parse(localStorage.getItem('currentUser')).profile_picture_url){
            this.profilePictureURL = environment.backendURL + `api/volunteer/username/${this.username}/profile/picture`
        }
    }
    ngAfterViewInit(){
    }
}
