/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCVApplications } from '../../store/cvThunk';
import { Card, Spinner, Badge } from 'flowbite-react';
import { AppDispatch, RootState } from '../../store/store';
import {
    HiOutlineBriefcase,
    HiOutlineCalendar,
    HiOutlineUser,
    HiOutlineEye,
    HiOutlineDownload,
    HiOutlineChat,
} from 'react-icons/hi';
import { getLabelByValue } from '../../helpers/convertToSelectOptions';
import { CONTRACT_TYPE_OPTIONS, LEVEL_OPTIONS, WORKING_TYPE_OPTIONS } from '../../helpers/constant';
import { Button } from 'flowbite-react';

const MyCVApplication = () => {
    const dispatch: AppDispatch = useDispatch();
    const { myCVApplications, loading } = useSelector((state: RootState) => state.cv);

    useEffect(() => {
        dispatch(getCVApplications());
    }, [dispatch]);

    if (loading)
        return (
            <div className="mt-10 flex justify-center">
                <Spinner color="info" size="xl" />
            </div>
        );

    const gradientClasses = [
        'bg-gradient-to-r from-blue-100 to-blue-50',
        'bg-gradient-to-r from-pink-100 to-pink-50',
        'bg-gradient-to-r from-green-100 to-green-50',
        'bg-gradient-to-r from-yellow-100 to-yellow-50',
        'bg-gradient-to-r from-purple-100 to-purple-50',
        'bg-gradient-to-r from-indigo-100 to-indigo-50',
    ];

    const getRandomGradient = () => {
        return gradientClasses[Math.floor(Math.random() * gradientClasses.length)];
    };

    const handleAskChatGPT = (cv: any, job_description: string) => {
        const cvImage = cv.file_path.replace('/upload/', '/upload/fl_attachment/');
        // Logic to call API to compare CV with Job Description via ChatGPT
        // For example, sending request to your backend that integrates with ChatGPT
        console.log('Comparing CV with Job Description...', cvImage, job_description);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                My CV Applications
            </h2>
            {myCVApplications.length === 0 ? (
                <p className="text-center text-gray-600">You haven't applied for any jobs yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {myCVApplications.map((app: any) => {
                        const job = app.job_description;
                        const cv = app.cv;
                        return (
                            <Card
                                key={app.id}
                                className={`transform p-4 shadow-lg transition-all hover:scale-103 hover:shadow-md ${getRandomGradient()}`}
                            >
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-xl font-semibold text-blue-700">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                        <Badge color="info" className="shadow-md hover:shadow-lg">
                                            <HiOutlineBriefcase className="mr-1 inline" />
                                            Level: {getLabelByValue(job.level, LEVEL_OPTIONS)}
                                        </Badge>
                                        <Badge color="gray" className="shadow-md hover:shadow-lg">
                                            <HiOutlineUser className="mr-1 inline" />
                                            Contract:{' '}
                                            {getLabelByValue(
                                                job.contract_type,
                                                CONTRACT_TYPE_OPTIONS
                                            )}
                                        </Badge>
                                        <Badge
                                            color="success"
                                            className="shadow-md hover:shadow-lg"
                                        >
                                            <HiOutlineBriefcase className="mr-1 inline" />
                                            Exp: {job.experience_year} years
                                        </Badge>
                                        <Badge color="purple" className="shadow-md hover:shadow-lg">
                                            <HiOutlineCalendar className="mr-1 inline" />
                                            Working:{' '}
                                            {getLabelByValue(
                                                job.working_type,
                                                WORKING_TYPE_OPTIONS
                                            )}
                                        </Badge>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        <span className="font-medium text-black">
                                            Salary range:{' '}
                                        </span>
                                        ${job.salary_min} - ${job.salary_max}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium text-black">Applied on: </span>
                                        {new Date(app.applied_at).toLocaleString()}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={cv.file_path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Button
                                                color="light"
                                                size="xs"
                                                pill
                                                className="w-full cursor-pointer justify-start gap-2 transition-colors hover:bg-blue-100"
                                            >
                                                <HiOutlineEye className="h-5 w-5" />
                                                View Submitted CV
                                            </Button>
                                        </a>
                                        <a
                                            href={`${cv.file_path.replace('/upload/', '/upload/fl_attachment/')}`}
                                        >
                                            <Button
                                                color="light"
                                                size="xs"
                                                pill
                                                className="w-full cursor-pointer justify-start gap-2 transition-colors hover:bg-green-100"
                                            >
                                                <HiOutlineDownload className="h-5 w-5" />
                                                Download CV
                                            </Button>
                                        </a>
                                        <Button
                                            color="light"
                                            size="xs"
                                            pill
                                            className="w-full cursor-pointer justify-start gap-2 transition-colors hover:bg-purple-100"
                                            onClick={() => handleAskChatGPT(cv, job.description)}
                                        >
                                            <HiOutlineChat className="h-5 w-5" />
                                            Ask ChatGPT to compare CV with JD
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyCVApplication;
