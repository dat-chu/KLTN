import { Link, useNavigate } from 'react-router-dom';
import { Button, Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { loadFromLocalStorage } from '../helpers/localStorage';
import { ROLE } from '../typeEnum';
import { ROUTER } from '../helpers/constant';
import axiosClient from '../api/axiosClient';

interface AuthUser {
    username: string;
    email: string;
    role: ROLE.CANDIDATE | ROLE.RECRUITER | ROLE.ADMIN;
}

const Header = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored: UserLoginResponse = loadFromLocalStorage('loginUser');
        if (stored && stored.access_token) {
            setUser({
                username: stored.user?.name,
                email: stored.user?.email,
                role: stored.user?.role_id, // ensure 'role' is saved during login
            });
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('loginUser');
        delete axiosClient.defaults.headers.common['Authorization'];
        navigate(ROUTER.LOGIN);
    };

    const renderTabs = () => {
        if (!user) return null;

        switch (user.role) {
            case ROLE.CANDIDATE:
                return (
                    <>
                        <Link
                            to={ROUTER.JOB_DESCRIPTION}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Jobs
                        </Link>
                        <Link
                            to={ROUTER.MY_CV_APPLICATIONS}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            My CVs
                        </Link>
                    </>
                );
            case ROLE.RECRUITER:
                return (
                    <>
                        <Link
                            to="/candidates"
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Candidates
                        </Link>
                        <Link
                            to={ROUTER.JOB_DESCRIPTION}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Job Description
                        </Link>
                    </>
                );
            case ROLE.ADMIN:
                return (
                    <>
                        <Link
                            to={ROUTER.USER_MANAGEMENT}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Manage Users
                        </Link>
                        <Link
                            to={ROUTER.JOB_DESCRIPTION}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Job Description
                        </Link>
                        <Link
                            to={ROUTER.PROGRAMMING_LANGUAGE}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Programming Language
                        </Link>
                        <Link
                            to={ROUTER.JOB_POSITION}
                            className="text-lg text-gray-700 hover:text-blue-600"
                        >
                            Job Position
                        </Link>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-8xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="text-xl font-bold text-blue-600">
                    <Link to="/">
                        <img
                            src="https://static.sitejabber.com/img/urls/1061785/logo.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Tabs */}
                <nav className="hidden space-x-8 md:flex">{renderTabs()}</nav>

                {/* Avatar or Login */}
                {user ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User avatar"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm font-medium text-gray-900">
                                {user.username}
                            </span>
                            <span className="block text-sm font-normal text-gray-500">
                                {user.email}
                            </span>
                        </DropdownHeader>
                        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </Dropdown>
                ) : (
                    <Link to="/login">
                        <Button className="rounded-lg bg-blue-500 font-semibold text-white hover:bg-blue-600">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
