export const ROUTER = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    UNAUTHOZIZED: '/unauthorized',
    USER_MANAGEMENT: '/user-management',
    PROGRAMMING_LANGUAGE: '/programming-language',
    JOB_POSITION: '/job-position',
    JOB_DESCRIPTION: '/job-description',
    JOB_DESCRIPTION_DETAIL: '/job-description/:id',
    POST_JOB: '/post-job',
    EDIT_JOB: '/edit-job/:id',
};

export const ROLE_MAP: Record<number, string> = {
    1: 'Admin',
    2: 'Recruiter',
    3: 'Candidate',
};

export const JOB_POSITION_OPTIONS = [
    { value: '', label: 'Select position' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'qa', label: 'QA' },
];

export const LEVEL_OPTIONS = [
    { value: '', label: 'Select level' },
    { value: 'intern', label: 'Intern' },
    { value: 'fresher', label: 'Fresher' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
    { value: 'executive', label: 'Executive' },
    { value: 'senior_executive', label: 'Senior Executive' },
];

export const WORKING_TYPE_OPTIONS = [
    { value: '', label: 'Select working type' },
    { value: 'offline', label: 'Offline' },
    { value: 'online', label: 'Online' },
];

export const CONTRACT_TYPE_OPTIONS = [
    { value: '', label: 'Select contract type' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'full-time', label: 'Full-time' },
];

export const JOB_DESCRIPTION_STATUS = [
    { value: '', label: 'Select status' },
    { value: 'reviewing', label: 'Reviewing' },
    { value: 'approved', label: 'Approved' },
];
