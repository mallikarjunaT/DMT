import { Routes } from '@angular/router';
import { DmtFormComponent } from './dmt-form/dmt-form.component';


export const DmtRoutes: Routes = [

  {
    path: '',
    children: [
    {
      path: 'dmt-form',
      component: DmtFormComponent,
      data: {
        title: 'DMT Form',
        urls: [{title: 'Dashboard',url: '/dashboard/userstatistics'},{title: 'DMT-form'}]
      }
    },
    ]
  }
]
