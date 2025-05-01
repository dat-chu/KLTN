import { ReactElement } from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Header />
            <main className="flex-1 bg-white">
                <section>{children}</section>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
