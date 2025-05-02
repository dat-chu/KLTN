import { useEffect, useState } from 'react';
import LoadingButton from '../../components/loadingButton';
import { Button, Spinner } from 'flowbite-react';
import { HiOutlinePencil, HiOutlineTrash, HiCheck, HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import {
    getJobPositions,
    createJobPosition,
    updateJobPosition,
    deleteJobPosition,
} from '../../store/jobThunk';

const JobPosition = () => {
    const dispatch: AppDispatch = useDispatch();
    const { jobPositions, loading } = useSelector((state: RootState) => state.job);

    const [newPosition, setNewPosition] = useState('');

    useEffect(() => {
        dispatch(getJobPositions());
    }, [dispatch]);

    const handleUpdate = async (id: number, newName: string) => {
        await dispatch(updateJobPosition({ id, name: newName })).unwrap();
    };

    const handleDelete = async (id: number) => {
        await dispatch(deleteJobPosition(id)).unwrap();
    };

    const handleAdd = async () => {
        if (!newPosition.trim()) return;
        await dispatch(createJobPosition({ name: newPosition }));
        setNewPosition('');
    };

    return (
        <div className="mx-auto my-16 max-w-3xl rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Job Positions</h2>

            <div className="mb-6">
                <div className="mb-4 flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Add a position"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                    <LoadingButton
                        isLoading={false}
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
                        {jobPositions
                            .filter((pos) => pos.id !== undefined)
                            .map((pos) => (
                                <PositionRow
                                    key={pos.id}
                                    item={pos as { id: number; name: string }}
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

const PositionRow = ({
    item,
    onUpdate,
    onDelete,
}: {
    item: { id: number; name: string };
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
        onUpdate(item.id, tempName);
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
                        <Button size="xs" color="gray" onClick={handleEdit} pill>
                            <HiOutlinePencil className="h-4 w-4" />
                        </Button>
                        <Button size="xs" color="failure" onClick={() => onDelete(item.id)} pill>
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
                            pill
                            disabled={!tempName.trim()}
                        >
                            <HiCheck className="h-4 w-4" />
                        </Button>
                        <Button size="xs" color="gray" onClick={handleCancel} pill>
                            <HiX className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default JobPosition;
