/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Select, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import PostJobCard from '../../components/PostJobCard';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { LEVEL_OPTIONS, ROUTER, JOB_DESCRIPTION_STATUS } from '../../helpers/constant';
import { fetchJobsByCurrentUser, getJobDescriptions } from '../../store/jobThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ROLE } from '../../typeEnum';
import { useSearchParams } from 'react-router-dom';

const JobDescription = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { jobs, total, loading } = useSelector((state: RootState) => state.job);
    const { user } = useSelector((state: RootState) => state.auth);

    const [searchParams, setSearchParams] = useSearchParams();
    const [levelFilter, setLevelFilter] = useState(() => searchParams.get('level') || '');
    const [statusFilter, setStatusFilter] = useState(() => searchParams.get('status') || '');
    const [search, setSearch] = useState(() => searchParams.get('search') || '');
    const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get('page') || '1'));
    const [limit] = useState(5);

    useEffect(() => {
        const params: any = {};

        if (levelFilter) params.level = levelFilter;
        if (statusFilter) params.status = statusFilter;
        if (search) params.search = search;
        if (currentPage !== 1) params.page = currentPage;

        setSearchParams(params);

        if (user.user.role_id === ROLE.RECRUITER) {
            dispatch(
                fetchJobsByCurrentUser({
                    page: currentPage,
                    limit,
                    level: levelFilter || undefined,
                    status: statusFilter || undefined,
                    search: search || undefined,
                })
            );
        } else {
            dispatch(
                getJobDescriptions({
                    page: currentPage,
                    limit,
                    level: levelFilter || undefined,
                    status: statusFilter || undefined,
                    search: search || undefined,
                })
            );
        }
    }, [dispatch, levelFilter, statusFilter, search, currentPage]);

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLevelFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
                <div className="flex items-center gap-4">
                    <Select value={levelFilter} onChange={handleLevelChange}>
                        <option value="">All Level</option>
                        {LEVEL_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    <Select value={statusFilter} onChange={handleStatusChange}>
                        <option value="">All Status</option>
                        {JOB_DESCRIPTION_STATUS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>

                    <TextInput
                        type="text"
                        placeholder="Search job..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <Link to={ROUTER.POST_JOB}>
                    <Button color="blue">Create Job Description</Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="grid gap-6">
                        {jobs.length > 0 ? (
                            jobs.map((job) => <PostJobCard key={job.id} {...job} />)
                        ) : (
                            <div className="text-center text-gray-500">No jobs found.</div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(total / limit)}
                            onPageChange={setCurrentPage}
                            showIcons
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default JobDescription;
