import { Operation } from './operation';

export class User {
  public email: string;
  public operations: Operation[];

  constructor(user: any) {
    this.email = user.email;
    this.operations = user.operations;
  }

  addOperation(operation: Operation) {
    this.operations.push(operation);
  }
}
