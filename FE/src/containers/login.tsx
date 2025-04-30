import { useState } from 'react';
import { Label, TextInput, Button } from 'flowbite-react';

const AuthModal = () => {
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
    const handleRegister = () => {
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

        console.log('Registering with:', formData);
        // Perform registration logic
    };

    // Handle Login
    const handleLogin = () => {
        const newErrors = {
            username: formData.username ? '' : 'Username is required',
            password: formData.password ? '' : 'Password is required',
            email: '',
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((msg) => msg !== '');
        if (hasErrors) return;

        console.log('Logging in with:', formData);
        // Perform login logic
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

                <Button
                    onClick={isRegister ? handleRegister : handleLogin}
                    className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600"
                >
                    {isRegister ? 'Register' : 'Login'}
                </Button>
            </div>
        </div>
    );
};

export default AuthModal;
