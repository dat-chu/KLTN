import { useState, useEffect } from 'react';
import { Label, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import LoadingButton from './loadingButton';
import { HiMail } from 'react-icons/hi';
import SelectInput from './SelectInput';

type UserEditerModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    userData: UserWithoutPassword | null;
    onSave: (data: UserWithoutPassword) => void;
};

export function UserEditerModal({ isOpen, setIsOpen, userData, onSave }: UserEditerModalProps) {
    const [userId, setUserId] = useState<number>(0);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('1');
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState({ email: '', name: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userData) {
            setUserId(userData.id ?? 0);
            setEmail(userData.email);
            setName(userData.name);
            setRole(String(userData.role_id));
            setIsActive(userData.is_active);
            setErrors({ email: '', name: '' });
        }
    }, [userData]);

    const validate = () => {
        const newErrors = {
            email: email ? '' : 'Email is required',
            name: name ? '' : 'Name is required',
        };
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((e) => e !== '');
    };

    const handleSave = async () => {
        if (!validate()) return;
        setIsSaving(true);
        await new Promise((res) => setTimeout(res, 500));
        onSave({
            id: userId,
            email,
            name,
            role_id: parseInt(role),
            is_active: isActive,
        });
        setIsSaving(false);
        setIsOpen(false);
    };

    return (
        <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)} popup>
            <ModalHeader />
            <ModalBody>
                <div className="space-y-6">
                    <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                        Edit User
                    </h3>

                    <div>
                        <Label htmlFor="name">Name</Label>
                        <TextInput
                            id="name"
                            addon="@"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors((prev) => ({ ...prev, name: '' }));
                            }}
                            required
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                            id="email"
                            placeholder="name@123.com"
                            rightIcon={HiMail}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: '' }));
                            }}
                            required
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <SelectInput
                        id="role"
                        label="Role"
                        value={role}
                        onChange={setRole}
                        options={[
                            { value: '1', label: 'Admin' },
                            { value: '2', label: 'Recruiter' },
                            { value: '3', label: 'Candidate' },
                        ]}
                        required
                    />

                    <SelectInput
                        id="is_active"
                        label="Status"
                        value={isActive ? '1' : '0'}
                        onChange={(value) => setIsActive(value === '1')}
                        options={[
                            { value: '1', label: 'Active' },
                            { value: '0', label: 'Deactive' },
                        ]}
                        required
                    />

                    <LoadingButton isLoading={isSaving} onClick={handleSave}>
                        Save
                    </LoadingButton>
                </div>
            </ModalBody>
        </Modal>
    );
}
