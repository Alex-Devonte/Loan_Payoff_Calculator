import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ResultsComponent } from './results/results.component';
import { DataTransferService } from './data-transfer.service';
//Added service

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
