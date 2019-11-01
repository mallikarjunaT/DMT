import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DmtRoutes } from './dmt.routing';
import { DmtFormComponent } from './dmt-form/dmt-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DmtRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,NgbModule, 
    Ng2SearchPipeModule
  ],
  declarations: [
    DmtFormComponent],
})

export class DmtModule { }