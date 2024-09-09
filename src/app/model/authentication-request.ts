export class AuthenticationRequest {
  username?: string;
  password?: string;


  constructor(data?: Partial<AuthenticationRequest>) {
    if (data) {
      this.username = data.username;
      this.password = data.password;
    }
  }
}
