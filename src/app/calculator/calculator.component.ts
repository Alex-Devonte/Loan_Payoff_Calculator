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

  ngOnInit() {}

  calculateLoanPayoff()  {
    this.model.monthlyInterest = this.calculateMonthlyInterest(this.model.APR);
    this.model.remainingPayments = Math.round(this.calculateRemainingPayments(this.model.monthlyInterest, this.model.monthlyPayment, this.model.loanBalance));
    this.model.yearsLeft = (this.model.remainingPayments/12).toFixed(1);
    this.calculateAmortizationSchedule();

    this.transferService.setData(this.model);
  }

  calculateMonthlyInterest(APR) {
    return APR / 12 / 100;
  }

  calculateRemainingPayments(monthlyInterest, monthlyPayment, principal) {
    return (-Math.log(1-monthlyInterest * principal / monthlyPayment) / Math.log(1+monthlyInterest));
  }

  /*calculateTotalInterest(remainingPayments, monthlyPayment, principal) {
    console.log ((remainingPayments * monthlyPayment - principal));
    return ((remainingPayments * monthlyPayment - principal));
  }*/

  calculateAmortizationSchedule() {
    var balance = this.model.loanBalance;
    var totalInterest = 0;

    var data = {};
    data['balance'] = new Array();
    data['interest'] = new Array();

    // Calculate the amortization  schedule
    for (var count = 0; count <= Math.round(this.model.remainingPayments);count++)
    {
      var interest = 0;
      var monthlyPrincipal = 0;

      /* Push values to array if count is a multiple of 12
         At the moment we only need data per year */
      if (count % 12 == 0)
      {
        data['balance'].push(Math.round(balance));
        data['interest'].push(Math.round(totalInterest));
      }

      //Get interest amount
      interest = balance * this.model.monthlyInterest;

      //Keep track of accruing monthly interest
      totalInterest += interest;   

      monthlyPrincipal = this.model.monthlyPayment - interest;

      //Keep track of remaing monthly balance
      balance -= monthlyPrincipal;
    }
    this.model.totalInterest = Math.round(totalInterest);
    this.model.chartData = data;
  }

  showResults() {
     this.loadComponent = true;
  }
}
