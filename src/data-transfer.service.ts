import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class DataTransferService {
  data = new Subject<any>();

  constructor() { }

  getData():any {
    return this.data;
  }

  setData(newData:any) {
    this.data.next(newData);
  }
}
