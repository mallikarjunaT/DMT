import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Isender } from './dmt/Model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DmtserviceService {

  constructor(private httpclient: HttpClient) { }

  createSender(data, otpRequired) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/sender/registersender/' + otpRequired, data)
  }

  otpConfirm(data) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/sender/validateotp', data)
  }
  login(userId, password) {

  }
  loginSubmit(data, agentId) {
    return this.httpclient.get('http://192.168.3.172:6461/dmt/sender/getsender/' + data + '/' + agentId)
  }
  isExistmobileNumber(data) {
    return this.httpclient.get('http://192.168.3.172:6461/dmt/sender/getsender/' + data)
  }

  createBeneficiary(data, otpRequired) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/benficiary/create/' + otpRequired, data)
  }
  getBeneficiaryListBySenderId(data) {
    return this.httpclient.get('http://192.168.3.172:6461/dmt/benficiary/getBenificiary/' + data)
  }
  beneficiaryOtpConfirm(data, otpRequired) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/benficiary/validatebeneficiary/' + otpRequired, data)
  }
  moneyTransfer(data, bankName) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/sendFund/p2a/' + bankName, data)
  }
  deleteBeneficiaryBySenderId(data) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/benficiary/delete', data)
  }
  deletebeneficiaryOtpConfirm(data) {
    return this.httpclient.post('http://192.168.3.172:6461/dmt/benficiary/validatebeneficiary/0', data)
  }
  getSendersListByAgentId(agentId) {
    return this.httpclient.get('http://192.168.3.172:6461/dmt/sender/senders/' + agentId)
  }
  deleteSender(senderMobileNumber, agentId) {
    return this.httpclient.delete('http://192.168.3.172:6461/dmt/sender/deletremitter/' + senderMobileNumber + '/' + agentId)
  }

}                              
