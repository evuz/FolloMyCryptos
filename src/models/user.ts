import { Operation } from './operation';

export class User {
  public email: string;
  public operations: Operation[];

  constructor(user: any) {
    this.email = user.email;
    this.operations = user.operations.map((operation) => {
      return new Operation(
        operation.currency,
        operation.amount,
        operation.investment
      );
    });
  }

  addOperation(operation: Operation) {
    const index = this.operations.findIndex((operationEl) => {
      return operationEl.currency.id === operation.currency.id;
    });
    if (index > -1) {
      this.operations[index].investment += operation.investment;
      this.operations[index].amount += operation.amount;
    } else {
      this.operations.push(operation);
    }
  }

  deleteOperation(operation: Operation) {
    const index = this.operations.findIndex((operationEl) => {
      return operationEl.currency.id === operation.currency.id;
    });
    if(index > -1) {
      this.operations.splice(index, 1);
    }
  }
}
