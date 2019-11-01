import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AepsComponent } from './aeps/aeps.component';

const routes: Routes = [
  
  {
    path: '',
    children: [
    {
      path: 'aeps-form',
      component: AepsComponent,
      data: {
        title: 'AEPS ',
        urls: [{title: 'Dashboard',url: '/dashboard/userstatistics'},{title: 'AEPS'}]
      }
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AepsRoutingModule { }
