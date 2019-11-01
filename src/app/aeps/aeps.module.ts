import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AepsRoutingModule } from './aeps-routing.module';
import { AepsComponent } from './aeps/aeps.component';
import { BalanceEnquiryComponent } from './aeps/balance-enquiry/balance-enquiry.component';
import { CashWithdrawalComponent } from './aeps/cash-withdrawal/cash-withdrawal.component';
import { TransactionHistoryComponent } from './aeps/transaction-history/transaction-history.component';

@NgModule({
  imports: [
    CommonModule,
    AepsRoutingModule
  ],
  declarations: [AepsComponent, BalanceEnquiryComponent, CashWithdrawalComponent, TransactionHistoryComponent]
})
export class AepsModule { }
