export {};

declare global {
  interface UserRegister {
    username: string;
    email: string;
    password: string;
  }

  interface UserLogin {
    username: string;
    password: string;
  }

  interface Token {
    access_token: string;
    token_type: string;
  }

  interface TokenData {
    username?: string;
  }

  interface User {
    id: number;
    username: string;
    email: string;
  }
}
