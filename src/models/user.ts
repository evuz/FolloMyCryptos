export class User {
  public email: string;
  public operations: any[];

  constructor(user: any) {
    this.email = user.email;
    this.operations = user.operations;
  }
}
