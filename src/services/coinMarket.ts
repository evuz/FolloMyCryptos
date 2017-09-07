import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoinMarketService {
  url = 'https://api.coinmarketcap.com/v1/';
  private coinNames: { id: string, name: string }[];

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

  fetchNames() {
    if (!this.coinNames) {
      this.http.get(`${this.url}ticker/`)
        .map((res: Response) => {
          return res.json();
        })
        .subscribe((data) => {
          this.coinNames = data.map((el) => {
            return {
              id: el.id,
              name: el.name
            }
          });
        });
    }
  }

  getCoinById(id: string) {
    return this.http.get(`${this.url}ticker/${id}/`)
      .map((res: Response) => {
        return res.json();
      })
      .map((data) => {
        return {
          id: data[0].id,
          symbol: data[0].symbol,
          rank: data[0].rank,
          name: data[0].name,
          priceUSD: +data[0].price_usd,
          isIncrease: +data[0].percent_change_1h > 0
        }
      });
  }

  getCoinNames() {
    return this.coinNames;
  }
}
