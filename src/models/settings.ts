export class Settings {

  constructor(
    public investmentCurrency: string = 'usd',
    public valueCurrency: string = 'usd'
  ) { }

  updateSettings(newSetting) {
    const { investmentCurrency, valueCurrency } = newSetting;

    if (investmentCurrency) this.investmentCurrency = investmentCurrency;
    if (valueCurrency) this.valueCurrency = valueCurrency;
  }
}
