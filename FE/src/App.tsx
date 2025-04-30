import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import Layout from './components/layout';
import AuthModal from './containers/login';

function App() {
    return (
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
        </BrowserRouter>
    );
}

export default App;
