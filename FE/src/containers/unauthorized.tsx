import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Unauthorized = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="mb-4 text-4xl font-bold text-red-600">401 - Unauthorized</h1>
            <p className="mb-6 text-lg text-gray-700">
                You do not have permission to view this page.
            </p>
            <Link to="/">
                <Button color="blue">Go back home</Button>
            </Link>
        </div>
    );
};

export default Unauthorized;
