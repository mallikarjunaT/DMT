import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobilePrepaidRoutingModule } from './mobile-prepaid-routing.module';
import { MobilePrepaidComponent } from './mobile-prepaid/mobile-prepaid.component';

@NgModule({
  imports: [
    CommonModule,
    MobilePrepaidRoutingModule
  ],
  declarations: [MobilePrepaidComponent]
})
export class MobilePrepaidModule { }
