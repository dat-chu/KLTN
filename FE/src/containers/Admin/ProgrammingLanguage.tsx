import { useEffect, useState } from 'react';
import LoadingButton from '../../components/loadingButton';
import { Button, Spinner } from 'flowbite-react';
import { HiOutlinePencil, HiOutlineTrash, HiCheck, HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
    getProgrammingLanguages,
    createProgrammingLanguage,
    updateProgrammingLanguage,
    deleteProgrammingLanguage,
} from '../../store/jobThunk';

const ProgrammingLanguage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { programmingLanguages, loading } = useSelector((state: RootState) => state.job);

    useEffect(() => {
        const fetchLanguages = async () => {
            await dispatch(getProgrammingLanguages());
        };

        fetchLanguages();
    }, []);

    const [newLanguage, setNewLanguage] = useState('');

    const handleUpdate = async (id: number, newName: string) => {
        await dispatch(updateProgrammingLanguage({ id, name: newName })).unwrap();
    };

    const handleDelete = async (id: number) => {
        await dispatch(deleteProgrammingLanguage(id)).unwrap();
    };

    const handleAdd = async () => {
        if (!newLanguage.trim()) return;
        await dispatch(createProgrammingLanguage({ name: newLanguage }));
        setNewLanguage('');
    };

    return (
        <div className="mx-auto my-16 max-w-3xl rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Programming Languages</h2>

            <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Add a language"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                    <LoadingButton
                        isLoading={loading}
                        onClick={handleAdd}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Add
                    </LoadingButton>
                </div>
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Spinner size="xl" color="info" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {programmingLanguages.map((lang) => (
                            <LanguageRow
                                key={lang.id}
                                item={lang}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const LanguageRow = ({
    item,
    onUpdate,
    onDelete,
}: {
    item: ProgrammingLanguage;
    onUpdate: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [tempName, setTempName] = useState(item.name);

    const handleEdit = () => {
        setTempName(name);
        setIsEditing(true);
    };

    const handleSave = () => {
        setName(tempName);
        if (item.id !== undefined) {
            onUpdate(item.id, tempName);
        } else {
            console.error('Item ID is undefined');
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempName(name);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
            {!isEditing ? (
                <>
                    <div className="font-medium text-gray-800">{name}</div>
                    <div className="flex gap-2">
                        <Button
                            size="xs"
                            color="gray"
                            onClick={handleEdit}
                            className="cursor-pointer transition-all hover:bg-gray-400"
                            pill
                        >
                            <HiOutlinePencil className="h-4 w-4" />
                        </Button>
                        <Button
                            size="xs"
                            color="failure"
                            onClick={() => item.id !== undefined && onDelete(item.id)}
                            className="cursor-pointer transition-all hover:bg-red-400"
                            pill
                        >
                            <HiOutlineTrash className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <input
                        className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        autoFocus
                    />
                    <div className="ml-2 flex gap-2">
                        <Button
                            size="xs"
                            color="success"
                            onClick={handleSave}
                            className="cursor-pointer transition-all hover:bg-green-400"
                            pill
                            disabled={!tempName.trim()}
                        >
                            <HiCheck className="h-4 w-4" />
                        </Button>
                        <Button
                            size="xs"
                            color="gray"
                            onClick={handleCancel}
                            className="cursor-pointer transition-all hover:bg-gray-400"
                            pill
                        >
                            <HiX className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProgrammingLanguage;
