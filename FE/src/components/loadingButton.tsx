import { Button } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import { ReactNode } from 'react';

interface LoadingButtonProps {
    isLoading: boolean;
    children: ReactNode;
    onClick: () => void;
    className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    isLoading,
    children,
    onClick,
    className = '',
}) => {
    return (
        <Button
            onClick={onClick}
            className={`w-full rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 ${className}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Spinner size="sm" aria-label="Loading..." className="mr-2" />
                    Loading...
                </div>
            ) : (
                children
            )}
        </Button>
    );
};

export default LoadingButton;
