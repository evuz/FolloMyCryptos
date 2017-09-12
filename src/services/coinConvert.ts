import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoinConvertService {
  conversion: number;
  time: number;

  constructor(private http: Http) { }

  getConversion(): Promise<number> {
    return new Promise((resolve, reject) => {
      const oneHour = 60 * 1000;
      if (this.conversion && this.time - Date.now() < oneHour) {
        resolve(this.conversion);
      } else {
        this.http.get('http://api.fixer.io/latest?base=USD&symbols=EUR')
          .subscribe((res: Response) => {
            const data = res.json();
            this.conversion = data.rates['EUR'];
            this.time = Date.now();
            resolve(this.conversion);
          });
      }
    })
  }
}
