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
  data = this.transferService.getData();

  constructor(private transferService: DataTransferService) { }

  ngOnInit() {
    this.transferService.data.subscribe(data => {
      this.data = data;
    });

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: "weatherDates".split(","),
        datasets: [
          { 
            data: "temp_max",
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: "temp_min",
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }
  }
}
