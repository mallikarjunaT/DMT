import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Message } from './message';
import { MailService } from './email.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DmtserviceService } from '../../dmtservice.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MailService]
})

export class EmailComponent implements OnInit {
  closeResult: string;
  messages: Message[];
  selectedMessage: Message;
  messageOpen = false;
  loginForm: FormGroup;
  submitted = false;
  constructor(private mailService: MailService, private dmtService:DmtserviceService, private modalService: NgbModal, private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });    
  }
//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//         return;
//     }
//     this.dmtService.login(this.f.username.value, this.f.password.value).subscribe(data => {
//                 this.router.navigate([this.returnUrl]);
//             })
// }
}
