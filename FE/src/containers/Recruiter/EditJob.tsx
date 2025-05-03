/* eslint-disable @typescript-eslint/no-explicit-any */
import PostJob from './PostJob';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJobDescriptionById, updateJobDescription } from '../../store/jobThunk';
import { AppDispatch } from '../../store/store';

const EditJobPage = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const [jobData, setJobData] = useState({});

    useEffect(() => {
        const fetchJobDetail = async () => {
            const res = await dispatch(getJobDescriptionById(id));
            const data_old = res.payload;
            setJobData({
                title: data_old.title,
                description: data_old.description,
                experience: data_old.experience_year.toString(),
                level: data_old.level,
                workingType: data_old.working_type,
                contractType: data_old.contract_type,
                salaryMin: data_old.salary_min.toString(),
                salaryMax: data_old.salary_max.toString(),
                status: data_old.status,
                position: data_old.job_position_id,
                programmingLanguages: data_old.programming_languages,
                endDate: new Date(data_old.end_date),
            });
        };

        fetchJobDetail();
    }, [id, dispatch]);

    const handleUpdate = async (data: any) => {
        await dispatch(updateJobDescription({ id, ...data }));
    };

    return <PostJob initialData={jobData} onSubmit={handleUpdate} isEditing />;
};

export default EditJobPage;
