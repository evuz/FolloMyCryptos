import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoinMarketService {
  url = 'https://api.coinmarketcap.com/v1/';

  constructor(private http: Http) { }

  getCoins(): Observable<any> {
    return this.http.get(`${this.url}ticker/`)
      .map((res: Response) => {
        return res.json();
      })
      .map((data) => {
        return data.map((el) => {
          return {
            id: el.id,
            symbol: el.symbol,
            rank: el.rank,
            name: el.name,
            priceUSD: +el.price_usd,
            isIncrease: +el.percent_change_1h > 0
          }
        });
      })
  }
}
