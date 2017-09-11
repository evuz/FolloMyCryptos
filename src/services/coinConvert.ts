import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoinConvertService {
  constructor(private http: Http) { }

  getConversion(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.http.get('http://api.fixer.io/latest?base=USD&symbols=EUR')
        .subscribe((res: Response) => {
          const data = res.json();
          resolve(data.rates['EUR']);
        });
    })
  }
}
