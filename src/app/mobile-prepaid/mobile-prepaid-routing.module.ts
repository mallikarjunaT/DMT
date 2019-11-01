import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MobilePrepaidComponent } from './mobile-prepaid/mobile-prepaid.component';

const routes: Routes = [
  {
    path: '',
    component: MobilePrepaidComponent,
    data: {
      title: 'Mobile Prepaid ',
      urls: [{title: 'Dashboard',url: '/dashboard/userstatistics'},{title: 'Mobile Prepaid'}]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilePrepaidRoutingModule { }
