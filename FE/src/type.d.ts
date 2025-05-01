export {};
import { ROLE } from "./typeEnum"

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
    name: string;
    email: string;
    password: string;
    role_id: ROLE;
    is_active: boolean;
  }

  interface UserLoginResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    user: User
  }

  interface UserWithoutPassword {
    id?: number;
    name: string;
    email: string;
    role_id: ROLE;
    is_active: boolean;
  }

  interface UserResponse {
    id?: number;
    name: string;
    email: string;
    role_id: ROLE;
    is_active: boolean;
  }

  interface AuthToken{
    access_token: string;
    refresh_token: string;
    token_type: string;
  }

  interface UserSearch { 
    page?: number,
    limit?: number,
    search?: string,
    role?: number,
    status?: number 
  }
}
