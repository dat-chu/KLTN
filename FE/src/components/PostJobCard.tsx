import { Badge, Button } from 'flowbite-react';
import { Link } from 'react-router';
import { JOB_DESCRIPTION_STATUS, LEVEL_OPTIONS } from '../helpers/constant';
import { getLabelByValue } from '../helpers/convertToSelectOptions';
import { formatDateToMMDDYYYY } from '../helpers/date';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteJobDescription } from '../store/jobThunk';

type PostJobCardProps = {
    id?: number;
    title: string;
    level: string;
    salaryMin: string;
    salaryMax: string;
    endDate: string;
    status: string;
    programmingLanguages: object[];
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
}: PostJobCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <Link to={`/job-description/${id}`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
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
                        {programmingLanguages.map((item) => item.name).join(', ')}
                    </div>
                    <div>
                        <span className="font-medium">Deadline:</span>{' '}
                        {formatDateToMMDDYYYY(endDate)}
                    </div>
                </div>
            </Link>
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
