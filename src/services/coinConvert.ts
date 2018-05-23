import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const KEY = 'c55697f9661d6c93ee6f538de1642fd4';

@Injectable()
export class CoinConvertService {
  conversion: number;
  time: number;

  constructor(private http: Http) {}

  getConversion(): Promise<number> {
    return new Promise((resolve, reject) => {
      const oneHour = 60 * 1000;
      if (this.conversion && this.time - Date.now() < oneHour) {
        resolve(this.conversion);
      } else {
        this.http
          .get(
            `http://data.fixer.io/latest?symbols=EUR&access_key=${KEY}`
          )
          .subscribe((res: Response) => {
            const data = res.json();
            this.conversion = data.rates['USD'];
            this.time = Date.now();
            resolve(1/this.conversion);
          });
      }
    });
  }
}
