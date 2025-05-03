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

  interface ProgrammingLanguage{
    id?: number;
    name: string;
  }

  interface JobPosition{
    id?: number;
    name: string;
  }

  interface JobDescription{
    id?: number
    createdBy: number
    position: number
    title: string
    description: string
    experienceYear: number
    level: string
    workingType: string
    contractType: string
    salaryMin: number
    salaryMax: number
    status: string
    endDate: string
    programmingLanguages: string[]
  }

  interface JobFilter {
    page: number;
    limit: number;
    level?: string;
    status?: string;
    search?: string;
  }

  interface FavoriteJob {
    id?: number;
    user_id: number;
    job_description_id: number;
  }
}
