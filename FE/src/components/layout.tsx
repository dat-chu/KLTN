import { ReactElement } from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Header with logo and navigation */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    {/* Logo Section */}
                    <div className="text-xl font-bold text-blue-600">
                        <Link to="/">ResumeBuilder</Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden space-x-8 md:flex">
                        <Link
                            to="/features"
                            className="text-lg text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Features
                        </Link>
                        <Link
                            to="/pricing"
                            className="text-lg text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className="text-lg text-gray-700 transition duration-300 hover:text-blue-600"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Call to Action Button */}
                    <Link to="/login" className="text-white">
                        <Button className="group cursor-pointer rounded-lg bg-blue-500 font-semibold text-white hover:bg-blue-600">
                            Login
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-white">
                <section>{children}</section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 py-6 text-center text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-sm">© 2025 ResumeBuilder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
