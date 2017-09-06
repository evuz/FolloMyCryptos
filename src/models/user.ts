export class User {
  constructor(
    private username: string
  ) { }

  getUsername() {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
  }
}
