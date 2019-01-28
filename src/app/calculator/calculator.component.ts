import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  model: any = {};
  private loadComponent = false;
  constructor(private transferService:DataTransferService) {}

  ngOnInit() {
    
  }

  calculateLoanPayoff()  {
    this.model.monthlyInterest = this.calculateMonthlyInterest(this.model.APR);
    this.model.remainingPayments = this.calculateRemainingPayments(this.model.monthlyInterest, this.model.monthlyPayment, this.model.loanBalance);
    this.model.totalInterest = this.calculateTotalInterest(this.model.remainingPayments, this.model.monthlyPayment, this.model.loanBalance);
    this.model.yearsLeft = (this.model.remainingPayments/12);
   
    this.transferService.setData(this.model);
  }

  calculateMonthlyInterest(APR) {
    return APR / 12 / 100;
  }

  calculateRemainingPayments(monthlyInterest, monthlyPayment, principal) {
    return (-Math.log(1-monthlyInterest * principal / monthlyPayment) / Math.log(1+monthlyInterest));
  }

  calculateTotalInterest(remainingPayments, monthlyPayment, principal) {
    return Math.round((remainingPayments * monthlyPayment - principal));
  }

  showResults() {
     this.loadComponent = true;
  }
}
