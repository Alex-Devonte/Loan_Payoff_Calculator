import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  model: any = {};
  constructor() { }

  ngOnInit() {
    
  }
  
  getLoanBalance(bal) {
    console.log("Balance: " + bal)  ;
  }

  calculateLoanPayoff()  {
    var monthlyInterest = this.calculateMonthlyInterest(this.model.APR);
    var remainingPayments = this.calculateRemainingPayments(monthlyInterest, this.model.monthlyPayment, this.model.loanBalance);
    var totalInterest = this.calculateTotalInterest(remainingPayments, this.model.monthlyPayment, this.model.loanBalance);
    console.log(this.model);
    console.log("Monthly Interest: " + monthlyInterest);
    console.log("Remaining Payments: " + Math.round(remainingPayments));
    console.log("Total Interest: " + totalInterest);
    console.log(-Math.log(1-(0.5/100)*3500/100)/Math.log(1+ (0.5/100)));
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
}
