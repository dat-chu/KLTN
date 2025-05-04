import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import Layout from './components/layout';
import AuthModal from './containers/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoleProtectedRoute from './utils/RoleProtectedRoute';
import { ROLE } from './typeEnum';
import { ROUTER } from './helpers/constant';
import Unauthorized from './containers/unauthorized';
import AdminUserManagement from './containers/Admin/UserManagement';
import ProgrammingLanguage from './containers/Admin/ProgrammingLanguage';
import JobPosition from './containers/Admin/JobPosition';
import PostJob from './containers/Recruiter/PostJob';
import JobDescription from './containers/Recruiter/JobDescription';
import JobDescriptionDetail from './containers/Recruiter/JobDescriptionDetail';
import EditJobPage from './containers/Recruiter/EditJob';
import MyCVApplication from './containers/Candidate/MyCVApplication';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={ROUTER.HOME}
                        element={
                            <RoleProtectedRoute
                                allowedRoles={[ROLE.CANDIDATE, ROLE.RECRUITER, ROLE.ADMIN]}
                            >
                                <Layout>
                                    <Home />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.LOGIN}
                        element={
                            <Layout>
                                <AuthModal />
                            </Layout>
                        }
                    />
                    <Route
                        path={ROUTER.UNAUTHOZIZED}
                        element={
                            <Layout>
                                <Unauthorized />
                            </Layout>
                        }
                    />
                    <Route
                        path={ROUTER.USER_MANAGEMENT}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}>
                                <Layout>
                                    <AdminUserManagement />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.PROGRAMMING_LANGUAGE}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}>
                                <Layout>
                                    <ProgrammingLanguage />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.JOB_POSITION}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.ADMIN]}>
                                <Layout>
                                    <JobPosition />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.JOB_DESCRIPTION}
                        element={
                            <RoleProtectedRoute
                                allowedRoles={[ROLE.RECRUITER, ROLE.CANDIDATE, ROLE.ADMIN]}
                            >
                                <Layout>
                                    <JobDescription />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.JOB_DESCRIPTION_DETAIL}
                        element={
                            <RoleProtectedRoute
                                allowedRoles={[ROLE.RECRUITER, ROLE.CANDIDATE, ROLE.ADMIN]}
                            >
                                <Layout>
                                    <JobDescriptionDetail />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.POST_JOB}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.RECRUITER, ROLE.ADMIN]}>
                                <Layout>
                                    <PostJob />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.EDIT_JOB}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.RECRUITER, ROLE.ADMIN]}>
                                <Layout>
                                    <EditJobPage />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                    <Route
                        path={ROUTER.MY_CV_APPLICATIONS}
                        element={
                            <RoleProtectedRoute allowedRoles={[ROLE.CANDIDATE]}>
                                <Layout>
                                    <MyCVApplication />
                                </Layout>
                            </RoleProtectedRoute>
                        }
                    />
                </Routes>
                <ToastContainer
                    position="top-right"
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
