import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BbpsComponent } from './bbps/bbps.component';

const routes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'bbps',
      component: BbpsComponent,
      data: {
        title: 'BBPS ',
        urls: [{title: 'Dashboard',url: '/dashboard/userstatistics'},{title: 'BBPS'}]
      }
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BbpsRoutingModule { }
