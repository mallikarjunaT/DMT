import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { DmtserviceService } from '../../dmtservice.service';
import { bankList, stateList, bankTransferMode } from "../bank_list";
import * as moment from 'moment';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { SwalPartialTargets } from '@toverux/ngx-sweetalert2';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
// import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dmt-form',
  templateUrl: './dmt-form.component.html',
  styleUrls: ['./dmt-form.component.css']
})
export class DmtFormComponent implements OnInit {
  timeLeft: number = 60;
  bentimeLeft: number = 60;
  bendeletetimeLeft: number = 60;
  interval;
  subscribeTimer: any;
  selectedSend: any;
  resultdata: any;
  sendersList: any;
  dateofbirth: any;
  @ViewChild('d') datePicker: NgbInputDatepicker;
  @Input() dateModel: Date;
  content: any;
  closeResult: string;
  selectedHero: any;
  selectedActive: boolean = false;
  senderLimit: any;
  last4DigitsfordeleteBen: any;
  last4DigitsfornewBen: any;
  swaldailog: boolean = true;
  @ViewChild('confirmFileDeletionSwal') confirmFileDeletion
  showCancelButton: any;
  swalWithBootstrapButtons: any;
  amountTransfer_Progressbar: boolean = true;
  moneyTransFerForm: any;
  jsonList = [];
  benficiary_Progressbar: boolean = true;
  isActive: boolean = false;
  loginform: boolean = false;
  dateofjoin: any;
  bankTransfermode: bankTransferMode[] = [
    { id: 1, mode: "IMPS" },
    { id: 2, mode: "NEFT" },
  ]
  banklist: bankList[] = [
    { id: 1, bankName: "Hdfc Bank" },
    { id: 2, bankName: "Axis Bank" },
    { id: 3, bankName: "Yes Bank" },
    { id: 4, bankName: "Andra Bank" },
    { id: 5, bankName: "Sate Bank" },
    { id: 6, bankName: "Icici Bank" }
  ];
  statelist: stateList[] = [
    { id: 1, stateName: "Andra Pradesh" },
    { id: 2, stateName: "Tamil Nadu" },
    { id: 3, stateName: "Telangana" },
    { id: 4, stateName: "Uttar Pradesh" },
    { id: 5, stateName: "Delhi" },
    { id: 6, stateName: "Arunachal Pradesh" }
  ];
  intervalId = 0;
  message = '';
  seconds = 11;
  clearTimer() { clearInterval(this.intervalId); }
  validateDate: boolean = false;
  exist = true;
  last4Digits: any;
  contact: any;
  result: any;
  deleteBeneficiaryMessage: any;
  beficiaryList: boolean;
  errorMessage
  successMessage: any;
  progressbar: boolean = true;
  existsenderForm: any;
  existingben: boolean = false;
  beneficiaryform: boolean = true;
  benForm: any;
  dmtForm: any;
  enrollform = true;
  @ViewChild('myModal') myModal;
  @ViewChild('addnewclass') addnewclass;
  @ViewChild('removeactive') removeactive;
  @ViewChild('myModal_newBeneficiary') myModal_newBeneficiary;
  constructor(private dmtservice: DmtserviceService, public readonly swalTargets: SwalPartialTargets, private modalService: NgbModal, private modalService2: NgbModal) { }

  ngOnInit() {

    this.dmtForm = new FormGroup({
      MobileNumber: new FormControl('', [Validators.required]),
      senderName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dobDate: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      otpRequired: new FormControl('', Validators.required)
    });
    this.benForm = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      beneficiaryName: new FormControl('', [Validators.required]),
      ifscCode: new FormControl('', [Validators.required]),
      beneficiaryMobileNumber: new FormControl('', [Validators.required]),
      beneficiaryOtpRequired: new FormControl('', [Validators.required])
    });
    this.existsenderForm = new FormGroup({
      existMobileNumber: new FormControl('', [Validators.required]),
    });
    this.moneyTransFerForm = new FormGroup({
      Amount: new FormControl('', [Validators.required]),
    });
    this.getSendersListByAgentId();
  }
  checkfun() {
    if (this.dmtForm.controls.MobileNumber.value == "" && this.dmtForm.controls.senderName.value == "") {
      this.dmtForm.controls.MobileNumber.touched = true;
      this.dmtForm.controls.senderName.touched = true;
      this.exist = true;
    }
    if (this.dmtForm.controls.MobileNumber.value != "" && this.dmtForm.controls.senderName.value == "") {
      this.dmtForm.controls.senderName.touched = true
    }
  }
  secondcheckfn() {
    if (this.benForm.controls.bankName.value == "" && this.benForm.controls.accountNumber.value == "") {
      this.benForm.controls.bankName.touched = true
      this.benForm.controls.accountNumber.touched = true
    }
  }
  thirdcheckfn() {
    if (this.benForm.controls.bankName.value == "" && this.benForm.controls.accountNumber.value == "" && this.benForm.controls.beneficiaryName.value == "") {
      this.benForm.controls.bankName.touched = true
      this.benForm.controls.accountNumber.touched = true
      this.benForm.controls.beneficiaryName.touched = true
    }
  }
  fourthcheckfn() {
    if (this.benForm.controls.bankName.value == "") {
      this.benForm.controls.bankName.touched = true
    }
  }
  firstcheckfn() {
    if (this.benForm.controls.bankName.value == "") {
      this.benForm.controls.bankName.touched = true
    }
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode == 47 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberOnly(event): boolean {
    this.exist = true;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    // if (this.dmtForm.controls.MobileNumber.value.length != 10) {
    //   this.exist = true;
    // }
    return true;

  }
  benNumberOnly(event): boolean {
    this.exist = true;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    if (this.dmtForm.controls.MobileNumber.value.length != 10) {
      this.exist = true;
    }
    return true;

  }



  ifsc(event: any) {
    const pattern = /[a-zA-Z 0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  enableexist() {
    this.existingben = false
    this.beficiaryList = false;
    this.beneficiaryform = true;
    this.getBeneficiaryListBySenderId();
  }
  AddnewBeniForm() {
    this.beneficiaryform = false;
    this.errorMessage = null;
    this.beficiaryList = true;
    this.existingben = true;
  }

  otpsubmit(senderOTP) {
    debugger;
    let otpobj = {
      "mobileNumber": this.dmtForm.controls.MobileNumber.value,
      "otp": senderOTP.value,
    }
    this.dmtservice.otpConfirm(otpobj).subscribe((response) => {
      this.result = response
      if (this.result.code == 200) {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
        this.isActive = true
        this.AddnewBeniForm();

        this.dmtForm.reset();
        this.progressbar = true;
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
      }
    })
  }

  loginSubmit(data) {
    debugger;
    localStorage.setItem('senderNumber', data);
    let agentId = "OPUP100001"
    this.progressbar = false;
    if (data.length == 10) {
      this.dmtservice.loginSubmit(data, agentId).subscribe((response) => {
        this.result = response;
        this.progressbar = true;
        if (this.result.code == 200 && this.result.data != null) {
          this.senderLimit = this.result.data.senderLimit;
          localStorage.setItem('remName', this.result.data.senderName);
          this.progressbar = true;
          this.beneficiaryform = true;
          this.exist = false;
          this.beficiaryList = false;
          this.isActive = true;

          this.getBeneficiaryListBySenderId();
        }
        else if (this.result.code == -1) {
          Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
        }
        else {
          Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
          this.dmtForm.patchValue({
            MobileNumber: parseInt(localStorage.getItem('senderNumber'))
          });
          this.senderLimit = "25000"
          this.progressbar = true;
          this.loginform = true;
          this.enrollform = false;
          this.beficiaryList = true;
          this.jsonList = null;
        }
      })
    }
  }



  createSender(content) {
    debugger;
    this.content = content;
    this.progressbar = false;
    let value = this.dmtForm.controls.dobDate.value;
    if (value.day <= 9) {
      this.dateofbirth = value.year + '-' + value.month + '-' + '0' + value.day;
    }
    else {
      this.dateofbirth = value.year + '-' + value.month + '-' + value.day;
    }
    let data = {
      "mobileNumber": this.dmtForm.controls.MobileNumber.value,
      "senderName": this.dmtForm.controls.senderName.value,
      "senderDOB": this.dateofbirth,
      "agentId": "OPUP100001",
      "senderAddress": this.dmtForm.controls.address.value,
      "senderPinCode": this.dmtForm.controls.pincode.value,
      "senderCity": this.dmtForm.controls.city.value,
      "senderState": this.dmtForm.controls.state.value,
      "merchantId": "31000000-0000-0000-0000-000000000000"
    }
    localStorage.setItem('senderNumber', this.dmtForm.controls.MobileNumber.value);
    localStorage.setItem('remName', this.dmtForm.controls.senderName.value);
    this.progressbar = false;
    let otpRequired = parseInt(this.dmtForm.controls.otpRequired.value);
    this.dmtservice.createSender(data, otpRequired).subscribe((response) => {
      this.result = response
      if (this.result.code == 210) {
        this.progressbar = true
        //this.sweetAlertWithInput();   
        this.countDown();
        this.open2(content);
      }
      if (this.result.code == 200) {
        this.dmtForm.reset();
        this.isActive = true;
        this.beneficiaryform = false;
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
      }
      this.progressbar = true;
    })
  }

  sweetAlertWithInput() {
    Swal({
      title: 'Sender Enrollment - OTP Confirmation',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.otpsubmit(login);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  sweetAlertWithInput1() {
    Swal({
      title: 'New Beneficiary - OTP Confirmation',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.beneficiaryOtpConfirm(login);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  deleteBeneficiaryOtpConfirm() {
    Swal({
      title: 'Delete Beneficiary - OTP Confirmation',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.deletebeneficiaryOtpConfirmservice(login);
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  isExistmobileNumber(data) {
    if (data.length != 10) {
      return false;
    }
    this.progressbar = false;
    let agentId = "OPUP100001"
    this.dmtservice.loginSubmit(data, agentId).subscribe((response) => {
      this.result = response
      if (this.result.code == 200) {
        this.progressbar = true;
        this.exist = false;
      }
      else {
        this.exist = true;
        this.progressbar = true;
      }
    })
  }
  changeNumber() {
    this.exist = true;
  }

  createBeneficiary(content) {
    this.benficiary_Progressbar = false;
    let data = {
      "accountNo": this.benForm.controls.accountNumber.value,
      "beneficiaryPhoneNo": this.benForm.controls.beneficiaryMobileNumber.value,
      "benficiaryName": this.benForm.controls.beneficiaryName.value,
      "ifsccode": this.benForm.controls.ifscCode.value,
      "senderNumber": parseInt(localStorage.getItem('senderNumber')),
      "agentId": "OPUP100001",
      "bankName": this.benForm.controls.bankName.value,
    }
    let otpRequired = parseInt(this.benForm.controls.beneficiaryOtpRequired.value);
    this.dmtservice.createBeneficiary(data, otpRequired).subscribe((response) => {
      this.result = response
      if (this.result.code == 200) {
        this.benficiary_Progressbar = true;
        this.benForm.reset();
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
      }
      if (this.result.code == 210) {
        this.exist = false;
        let senderNumber = localStorage.getItem('senderNumber')
        this.bencountDown();
        this.open2(content);
        this.exist = true;
      }

    })
  }
  getBeneficiaryListBySenderId() {
    let senderNumber = parseInt(localStorage.getItem('senderNumber'))
    this.dmtservice.getBeneficiaryListBySenderId(senderNumber).subscribe((response) => {
      this.result = response
      if (this.result.code == 200 && this.result.data != null) {
        this.progressbar = true;
        this.exist = false;
        this.beficiaryList = false;
        this.jsonList = this.result.data
        console.log(this.jsonList);
        this.isActive = false;
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
        this.exist = true;
        this.isActive = true;
        this.beneficiaryform = false;
        this.beficiaryList = true;
        this.progressbar = true;
      }
    })
  }

  beneficiaryOtpConfirm(otpsubmit) {
    debugger;
    let otpobj = {
      "senderNumber": parseInt(localStorage.getItem('senderNumber')),
      "otp": otpsubmit.value,
      "beneficiaryPhoneNo": this.benForm.controls.beneficiaryMobileNumber.value
    }
    let status = 1;
    this.dmtservice.beneficiaryOtpConfirm(otpobj, status).subscribe((response) => {
      this.result = response
      if (this.result.code == 200) {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
        this.isActive = true;
        localStorage.setItem("beneAccNo", this.benForm.controls.accountNumber.value),
          localStorage.setItem("beneMobile", this.benForm.controls.beneficiaryMobileNumber.value),
          localStorage.setItem("beneName", this.benForm.controls.beneficiaryName.value),
          localStorage.setItem("beneIFSC", this.benForm.controls.ifscCode.value),
          localStorage.setItem("bankName", this.benForm.controls.bankName.value),
          this.benForm.reset();
        this.benficiary_Progressbar = true;
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
        this.benficiary_Progressbar = true;
        this.benForm.reset();
      }
    })
  }

  sendMoney(amount) {
    this.amountTransfer_Progressbar = false;
    let selectedBeneficiaryforTransfer = JSON.parse(localStorage.getItem('selectedBeneficiaryforTransfer'));
    let amountTransferData = {
      "agentId": selectedBeneficiaryforTransfer.agentId,
      "amount": amount,
      "beneAccNo": selectedBeneficiaryforTransfer.accountNo,
      "beneIFSC": selectedBeneficiaryforTransfer.ifscCode,
      "beneName": selectedBeneficiaryforTransfer.beneficiaryName,
      "beneMobile": selectedBeneficiaryforTransfer.beneficiaryphoneNum,
      "remMobile": selectedBeneficiaryforTransfer.senderNumber,
      "remName": localStorage.getItem('remName'),
      "tranRefNo": "77897899",
      "merchantId": "31000000-0000-0000-0000-000000000000"
    }
    let bankName = "icici";
    this.dmtservice.moneyTransfer(amountTransferData, bankName).subscribe((response) => {
      this.result = response
      if (this.result.code == 200) {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
        this.isActive = true
        this.benForm.reset();
        this.amountTransfer_Progressbar = true;
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
        this.amountTransfer_Progressbar = true;
      }
    })
  }

  deleteBeneficiary(selectedData, content) {
    debugger
    this.benficiary_Progressbar = false;
    let data = {
      "agentId": selectedData.agentId,
      "beneficiaryPhoneNo": selectedData.beneficiaryphoneNum,
      "senderNumber": selectedData.senderNumber
    }
    localStorage.setItem('selectedDeleteData', JSON.stringify(data))
    this.dmtservice.deleteBeneficiaryBySenderId(data).subscribe((response) => {
      this.result = response
      if (this.result.code == 210) {
        this.bendeletecountDown();
        this.open2(content);
      }
      else {
        this.benficiary_Progressbar = true;
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
      }

    })
  }

  deletebeneficiaryOtpConfirmservice(otp) {
    debugger;
    let status = 0;
    let selectedDeleteData = JSON.parse(localStorage.getItem('selectedDeleteData'));
    let data = {
      "otp": parseInt(otp),
      "beneficiaryPhoneNo": selectedDeleteData.beneficiaryPhoneNo,
      "senderNumber": selectedDeleteData.senderNumber
    }
    this.dmtservice.deletebeneficiaryOtpConfirm(data).subscribe((response) => {
      this.result = response;
      if (this.result.code == 200) {
        this.benficiary_Progressbar = true;
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
        this.getBeneficiaryListBySenderId();
      }
      else {

        this.benficiary_Progressbar = true;
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
      }
    })
  }

  selectedBeneficiary(selectedBeneficiaryforTransfer, content) {
    this.selectedHero = selectedBeneficiaryforTransfer;
    localStorage.setItem('selectedBeneficiaryforTransfer', JSON.stringify(this.selectedHero));
  }

  open2(content) {
    var telNb = this.dmtForm.controls.MobileNumber.value;
    this.last4Digits = telNb % 10000;
    let sendernumber = parseInt(localStorage.getItem('senderNumber'));
    this.last4DigitsfornewBen = sendernumber % 10000;
    this.last4DigitsfordeleteBen = sendernumber % 10000;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.modalService2.open(content, { windowClass: 'dark-modal' });
    this.benForm.reset();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getSendersListByAgentId() {
    let agentId = "OPUP100001"
    this.dmtservice.getSendersListByAgentId(agentId).subscribe(result => {
      this.resultdata = result;
      this.sendersList = this.resultdata.data
    })
  }

  selectedSender(data) {
    debugger;
    this.progressbar = false;
    this.selectedSend = data;
    this.senderLimit = this.selectedSend.senderLimit;
    localStorage.setItem('senderNumber', this.selectedSend.senderMobileNumber);
    localStorage.setItem('remName', this.selectedSend.senderName);

    let agentId = "OPUP100001"
    this.dmtservice.getBeneficiaryListBySenderId(this.selectedSend.senderMobileNumber).subscribe((response) => {
      this.result = response
      if (this.result.code == 200 && this.result.data != null) {
        this.beneficiaryform = true;
        this.progressbar = true;
        this.exist = false;
        this.beficiaryList = false;
        this.jsonList = this.result.data;
        this.isActive = false;
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
        this.exist = true;
        this.isActive = true;
        this.beneficiaryform = false;
        this.beficiaryList = true;
        this.progressbar = true;
        this.benForm.reset();
      }
    })
  }

  countDown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.pauseTimer();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    var element = document.getElementById("CloseButton") as any;
    element.click();
    if (this.timeLeft == 0) {
      this.timeLeft = 60;
    }
    this.timeLeft == 60;
  }

  bencountDown() {
    this.interval = setInterval(() => {
      if (this.bentimeLeft > 0) {
        this.bentimeLeft--;
      }
      else {
        this.benpauseTimer();
      }
    }, 60000)
  }

  benpauseTimer() {
    clearInterval(this.interval);
    var element = document.getElementById("CloseButton1") as any;
    element.click();
    if (this.bentimeLeft == 0) {
      this.bentimeLeft = 60;
    }
    this.bentimeLeft == 60;
  }

  bendeletecountDown() {
    this.interval = setInterval(() => {
      if (this.bendeletetimeLeft > 0) {
        this.bendeletetimeLeft--;
      }
      else {
        this.bendeletepauseTimer();
      }
    }, 1000)
  }

  bendeletepauseTimer() {
    clearInterval(this.interval);
    var element = document.getElementById("CloseButton2") as any;
    element.click();
    if (this.bendeletetimeLeft == 0) {
      this.bendeletetimeLeft = 60;
    }
    this.bendeletetimeLeft == 60;
  }

  deleteSender(senderObj) {
    debugger;
    let senderMobileNumber = senderObj.senderMobileNumber;
    let agentId = senderObj.agentId;
    this.dmtservice.deleteSender(senderMobileNumber, agentId).subscribe(response => {
      this.result = response;
      if (this.result.code == 200) {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'success', title: this.result.userDisplayMesg, timer: 5000 });
        this.getSendersListByAgentId();
      }
      else {
        Swal({ toast: true, showConfirmButton: false, position: 'top-right', type: 'error', title: this.result.userDisplayMesg, timer: 5000 });
      }
    })
  }
  favoratbtn() {
    this.enrollform = true;
    this.loginform = false;
    this.existsenderForm.reset();
    this.getSendersListByAgentId();
  }
}

