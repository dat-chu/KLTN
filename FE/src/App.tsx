import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import Layout from './components/layout';
import AuthModal from './containers/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Layout>
                                <AuthModal />
                            </Layout>
                        }
                    />
                </Routes>
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </BrowserRouter>
        </>
    );
}

export default App;
