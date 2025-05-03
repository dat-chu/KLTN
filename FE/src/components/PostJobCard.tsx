import { Badge, Button } from 'flowbite-react';
import { Link } from 'react-router';
import { JOB_DESCRIPTION_STATUS, LEVEL_OPTIONS } from '../helpers/constant';
import { getLabelByValue } from '../helpers/convertToSelectOptions';
import { formatDateToMMDDYYYY } from '../helpers/date';
import { Pencil, Trash2, Heart } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteJobDescription } from '../store/jobThunk';
import { ROLE } from '../typeEnum';
import { postFavoriteJob, deleteFavoriteJob } from '../store/favoriteJobThunk';

type PostJobCardProps = {
    id?: number;
    title: string;
    level: string;
    salaryMin: string;
    salaryMax: string;
    endDate: string;
    status: string;
    programmingLanguages: object[];
    isFavoriteJob: boolean;
};

const PostJobCard = ({
    id,
    title,
    level,
    salaryMin,
    salaryMax,
    endDate,
    status,
    programmingLanguages,
    isFavoriteJob,
}: PostJobCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth.user);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleToggleFavorite = async () => {
        try {
            if (isFavoriteJob) {
                await dispatch(deleteFavoriteJob(id));
            } else {
                await dispatch(postFavoriteJob(id));
            }
            // setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Toggle favorite failed:', error);
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
                <Link to={`/job-description/${id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {title}
                    </h2>
                </Link>
                {user.role_id !== ROLE.CANDIDATE ? (
                    <Badge
                        color={
                            status === getLabelByValue('reviewing', JOB_DESCRIPTION_STATUS)
                                ? 'failure'
                                : 'success'
                        }
                        className="text-sm font-medium"
                    >
                        {status}
                    </Badge>
                ) : (
                    <Button
                        size="xs"
                        color="light"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite();
                        }}
                        className="cursor-pointer rounded-full transition hover:bg-red-100"
                    >
                        <Heart
                            className={`h-5 w-5 ${isFavoriteJob ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                    </Button>
                )}
            </div>
            <p className="mt-1 text-gray-500">SETA International</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                    <span className="font-medium">Level:</span>{' '}
                    {getLabelByValue(level, LEVEL_OPTIONS)}
                </div>
                <div>
                    <span className="font-medium">Salary:</span>{' '}
                    {(Number(salaryMax) + Number(salaryMin)) / 2}
                </div>
                <div>
                    <span className="font-medium">Programming Languages:</span>{' '}
                    {programmingLanguages &&
                        programmingLanguages.length > 0 &&
                        programmingLanguages.map((item) => item.name).join(', ')}
                </div>
                <div>
                    <span className="font-medium">Deadline:</span> {formatDateToMMDDYYYY(endDate)}
                </div>
            </div>
            {user.role_id !== ROLE.CANDIDATE ? (
                <div className="flex w-full justify-end gap-2">
                    <Link to={`/edit-job/${id}`}>
                        <Button
                            size="xs"
                            color="light"
                            className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-all hover:border-blue-500 hover:text-blue-600"
                        >
                            <Pencil size={14} />
                            Edit
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setShowConfirmModal(true)}
                        size="xs"
                        color="light"
                        className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-all hover:border-red-500 hover:text-red-600"
                    >
                        <Trash2 size={14} />
                        Delete
                    </Button>
                </div>
            ) : (
                <div className="mt-4 flex justify-end">
                    <Link to={`/job-description/${id}`} className="cursor-pointer">
                        <Button
                            size="sm"
                            color="green"
                            className="rounded-md px-4 py-2 text-sm font-semibold shadow-md transition hover:brightness-110"
                        >
                            Apply Now
                        </Button>
                    </Link>
                </div>
            )}
            <ConfirmModal
                isOpen={showConfirmModal}
                setIsOpen={setShowConfirmModal}
                message={`Are you sure you want to delete ${title} job"?`}
                confirmText="Yes"
                cancelText="Cancel"
                onConfirm={() => {
                    dispatch(deleteJobDescription(id));
                    setShowConfirmModal(false);
                }}
            />
        </div>
    );
};

export default PostJobCard;
