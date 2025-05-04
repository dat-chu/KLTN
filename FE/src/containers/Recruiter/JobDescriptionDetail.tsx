/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDescriptionById, getJobPositionById } from '../../store/jobThunk';
import { AppDispatch, RootState } from '../../store/store';
import { getLabelByValue } from '../../helpers/convertToSelectOptions';
import { LEVEL_OPTIONS, CONTRACT_TYPE_OPTIONS, WORKING_TYPE_OPTIONS } from '../../helpers/constant';
import { formatDateToMMDDYYYY } from '../../helpers/date';
import MarkdownViewer from '../../components/MarkdownViewer';
import { ROLE } from '../../typeEnum';
import { motion } from 'framer-motion';
import { uploadFile } from '../../store/cvThunk';

const JobDescriptionDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loadingCV, jobById, loading, jobPositionById } = useSelector(
        (state: RootState) => state.job
    );
    const { user } = useSelector((state: RootState) => state.auth.user);
    const { id } = useParams();

    useEffect(() => {
        const fetchJobDetail = async () => {
            const res = await dispatch(getJobDescriptionById(id));
            await dispatch(getJobPositionById(res.payload.job_position_id));
        };

        fetchJobDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-200px)] items-center justify-center">
                <Spinner size="xl" color="info" aria-label="Loading job detail..." />
            </div>
        );
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !id) return;

        const data = new FormData();
        data.append('file', file);

        try {
            await dispatch(uploadFile({ data, id }));
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
            {/* Header Section with gradient */}
            <motion.div variants={itemVariants} className="mb-12 text-center">
                <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2">
                    <span className="text-sm font-medium text-blue-600">
                        {getLabelByValue(jobById.level, LEVEL_OPTIONS)} Level
                    </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                    {jobById.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-lg text-gray-600">
                    <div className="flex items-center">
                        <svg
                            className="mr-2 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{jobById.experience_year}+ years experience</span>
                    </div>
                    <div className="flex items-center">
                        <svg
                            className="mr-2 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span>{jobById.working_type || 'Remote/On-site'}</span>
                    </div>
                </div>
            </motion.div>

            {/* Key Details Grid */}
            <motion.div
                variants={containerVariants}
                className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {[
                    {
                        label: 'Position',
                        value: jobPositionById.name,
                        icon: (
                            <svg
                                className="h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        ),
                    },
                    {
                        label: 'Salary Range',
                        value: `$${jobById.salary_min} - $${jobById.salary_max} USD`,
                        icon: (
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                    },
                    {
                        label: 'Contract Type',
                        value: getLabelByValue(jobById.contract_type, CONTRACT_TYPE_OPTIONS),
                        icon: (
                            <svg
                                className="h-6 w-6 text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        ),
                    },
                    {
                        label: 'Working Type',
                        value: getLabelByValue(jobById.working_type, WORKING_TYPE_OPTIONS),
                        icon: (
                            <svg
                                className="h-6 w-6 text-orange-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        ),
                    },
                    {
                        label: 'Start recruitment',
                        value: formatDateToMMDDYYYY(jobById.created_at),
                        icon: (
                            <svg
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        ),
                    },
                    {
                        label: 'End of recruitment',
                        value: formatDateToMMDDYYYY(jobById.end_date),
                        icon: (
                            <svg
                                className="h-6 w-6 text-yellow-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        ),
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Technical Requirements */}
            {jobById.programming_languages?.length > 0 && (
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Technical Requirements
                        </span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {jobById.programming_languages.map((lang: any) => (
                            <motion.span
                                key={lang.id}
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm transition-all duration-200 hover:shadow-md"
                            >
                                <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                                {lang.name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Job Description */}
            <motion.div variants={itemVariants} className="mb-16 rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-8 text-2xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Job Description
                    </span>
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                    <MarkdownViewer content={jobById.description} />
                </div>
            </motion.div>

            {/* CTA Button */}
            {user.role_id === ROLE.CANDIDATE && (
                <div className="space-y-2">
                    <div className="relative inline-flex w-full items-center justify-center">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Upload Scanned CV (Image Only)
                            {loadingCV ? (
                                <Spinner color="info" size="md" className="ml-2" />
                            ) : (
                                <svg
                                    className="ml-2 inline-block h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={4}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            )}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <p>• Only scanned CV images accepted (JPG, PNG, WEBP)</p>
                        <p>• Ensure clear, readable text</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default JobDescriptionDetail;
