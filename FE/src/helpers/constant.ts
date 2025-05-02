export const ROUTER = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    UNAUTHOZIZED: "/unauthorized",
    USER_MANAGEMENT: "/user-management",
    PROGRAMMING_LANGUAGE: "/programming-language",
    JOB_POSITION: "/job-position",
}

export const ROLE_MAP: Record<number, string> = {
    1: 'Admin',
    2: 'Recruiter',
    3: 'Candidate',
};
