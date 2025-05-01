import { Modal, ModalBody, ModalHeader, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

type ConfirmModalProps = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    title?: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function ConfirmModal({
    isOpen,
    setIsOpen,
    title = 'Confirmation',
    message,
    onConfirm,
    confirmText = 'Yes',
    cancelText = 'Cancel',
}: ConfirmModalProps) {
    const handleClose = () => setIsOpen(false);

    return (
        <Modal show={isOpen} size="md" onClose={handleClose} popup>
            <ModalHeader className="text-center">{title}</ModalHeader>
            <ModalBody>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {message}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            className="rounded-lg bg-red-500 font-semibold text-white hover:bg-red-600"
                            color="failure"
                            onClick={() => {
                                onConfirm();
                                handleClose();
                            }}
                        >
                            {confirmText}
                        </Button>
                        <Button color="gray" onClick={handleClose}>
                            {cancelText}
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
