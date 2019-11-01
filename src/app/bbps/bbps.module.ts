import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BbpsRoutingModule } from './bbps-routing.module';
import { BbpsComponent } from './bbps/bbps.component';
import { MobilepostpaidComponent } from './mobilepostpaid/mobilepostpaid.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { DthComponent } from './dth/dth.component';
import { BroadbandComponent } from './broadband/broadband.component';
import { LandlineComponent } from './landline/landline.component';
import { WaterComponent } from './water/water.component';
import { GasComponent } from './gas/gas.component';
import { ComplaintManagementComponent } from './complaint-management/complaint-management.component';

@NgModule({
  imports: [
    CommonModule,
    BbpsRoutingModule
  ],
  declarations: [BbpsComponent, MobilepostpaidComponent, ElectricityComponent, DthComponent, BroadbandComponent, LandlineComponent, WaterComponent, GasComponent, ComplaintManagementComponent]
})
export class BbpsModule { }
