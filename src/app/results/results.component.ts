import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  chart = [];
  data = "";

  constructor(private transferService: DataTransferService) { }

  ngOnInit() {
    this.transferService.data.subscribe(data => {
      this.data = data;
      this.createChart(this.data);
    });
  }

  roundBalance(n) {
    //Round n to nearest hundred
    if (n < 1000) {
        return(Math.round(n/100)*100);
    }
    //Round n to nearest thousand
    else if (n > 1000) {
        return(Math.round(n/1000)*1000);
      }
  }

  createChart(data) {
    var yearsRange = new Array();
    for (var i = 0; i <= data.yearsLeft; i++)
    {
        yearsRange.push(i+1);
    }

    var interestData = {
        label: "Interest",
        data: data.chartData.interest,
        backgroundColor: "#ca0000"
    };

    var principalData = {
        label: "Principal",
        data: data.chartData.balance,
        backgroundColor: "#000"
    };

    var loanData = {
        labels: yearsRange,
        datasets: [interestData, principalData]
    };

    this.chart = new Chart('canvas', {
        type: 'bar',
        data: loanData,
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Years"
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 2000,
                        max: this.roundBalance(data.loanBalance)
                    }
                }]
            }
        }
    });
  }
}
