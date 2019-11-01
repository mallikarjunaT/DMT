import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
   

    {
        path: '/dmt/dmt-form', title: 'DMT', icon: 'fa fa-plus-square-o', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/aeps/aeps-form', title: 'AEPS', icon: 'fa fa-plus-square-o', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/bbps/bbps', title: 'BBPS', icon: 'fa fa-plus-square-o', class: '', label: '', labelClass: '', extralink: false, submenu: [
            // { path: '/bbps/bbps', title: 'Electricity', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            
        ]
    },
    {
        path: '/mobile-prepaid', title: 'Mobile Prepaid', icon: 'fa fa-plus-square-o', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
     
];

