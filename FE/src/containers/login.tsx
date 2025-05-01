import { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../store/authThunk';
import { AppDispatch, RootState } from '../store/store';
import LoadingButton from '../components/loadingButton';
import { saveToLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
    const navigate = useNavigate();
    const { loading } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
    });

    // Handle Register
    const handleRegister = async () => {
        const newErrors = {
            username: formData.username ? '' : 'Username is required',
            password: formData.password ? '' : 'Password is required',
            email: formData.email ? '' : 'Email is required',
        };

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        if (hasErrors) return;

        await dispatch(registerUser(formData));
    };

    // Handle Login
    const handleLogin = async () => {
        const newErrors = {
            username: formData.username ? '' : 'Username is required',
            password: formData.password ? '' : 'Password is required',
            email: '',
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        if (hasErrors) return;

        const loginResult = await dispatch(
            loginUser({
                userData: formData,
                navigate: (path: string) => {
                    navigate(path);
                },
            })
        );
        saveToLocalStorage('loginUser', loginResult.payload);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-6 flex justify-center">
                    <div
                        className={`mr-6 cursor-pointer pb-2 text-center text-lg font-semibold transition-all duration-300 ${
                            isRegister ? 'border-b-4 border-blue-500' : 'text-gray-500'
                        }`}
                        onClick={() => setIsRegister(true)}
                    >
                        Register
                    </div>
                    <div
                        className={`ml-6 cursor-pointer pb-2 text-center text-lg font-semibold transition-all duration-300 ${
                            !isRegister ? 'border-b-4 border-blue-500' : 'text-gray-500'
                        }`}
                        onClick={() => setIsRegister(false)}
                    >
                        Login
                    </div>
                </div>

                <h1 className="mb-6 text-center text-3xl font-bold">
                    {isRegister ? 'Register' : 'Login'}
                </h1>

                <div className="mb-4">
                    <Label htmlFor="username">Username</Label>
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>

                {isRegister && (
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                )}

                <div className="mb-6">
                    <Label htmlFor="password">Password</Label>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <LoadingButton
                    isLoading={loading} // Check the loading state from Redux
                    onClick={isRegister ? handleRegister : handleLogin}
                >
                    {isRegister ? 'Register' : 'Login'}
                </LoadingButton>
            </div>
        </div>
    );
};

export default AuthModal;
