export class Operation {
  public amount: number;
  public investment: number;

  constructor(
    public currency: { id: string, name: string },
    amount: string,
    investment: string
  ) {
    this.amount = +amount;
    this.investment = +investment;
  }
}
