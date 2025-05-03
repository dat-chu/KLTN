/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Label, TextInput, Datepicker } from 'flowbite-react';
import SelectInput from '../../components/SelectInput';
import MarkdownEditor from '../../components/MarkdownEditor';
import LoadingButton from '../../components/loadingButton';
import Select from 'react-select';
import {
    LEVEL_OPTIONS,
    WORKING_TYPE_OPTIONS,
    CONTRACT_TYPE_OPTIONS,
    JOB_DESCRIPTION_STATUS,
} from '../../helpers/constant';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
    getJobPositions,
    getProgrammingLanguages,
    createJobDescription,
} from '../../store/jobThunk';
import { convertToSelectOptions } from '../../helpers/convertToSelectOptions';
import { getLabelByValue } from '../../helpers/convertToSelectOptions';

interface PostJobProps {
    initialData?: Partial<FormData>;
    onSubmit?: (data: any) => Promise<void>;
    isEditing?: boolean;
}

interface FormData {
    title: string;
    position: string | null;
    experience: string;
    level: string;
    workingType: string;
    contractType: string;
    salaryMin: string;
    salaryMax: string;
    description: string;
    endDate: Date;
    status: string;
    programmingLanguages: any;
}

const PostJob = ({ initialData, onSubmit, isEditing = false }: PostJobProps) => {
    const dispatch: AppDispatch = useDispatch();
    const { jobPositions, programmingLanguages, loading } = useSelector(
        (state: RootState) => state.job
    );

    const [form, setForm] = useState<FormData>({
        title: '',
        position: null,
        experience: '',
        level: '',
        workingType: '',
        contractType: '',
        salaryMin: '',
        salaryMax: '',
        description: '',
        endDate: new Date(),
        status: getLabelByValue('reviewing', JOB_DESCRIPTION_STATUS),
        programmingLanguages: [],
    });

    useEffect(() => {
        if (initialData) {
            setForm((prev) => ({
                ...prev,
                ...initialData,
                programmingLanguages: initialData.programmingLanguages || [],
            }));
        }
    }, [initialData]);

    const handleChange = (name: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectProgrammingLanguage = (selectedOptions: any[]) => {
        setForm((prev) => ({
            ...prev,
            programmingLanguages: selectedOptions.map((option) => {
                return {
                    id: option.value,
                    name: option.label,
                };
            }),
        }));
    };

    const transformProgrammingLanguages = (languages: any) => {
        return languages.map((language: any) => language.id);
    };

    const handleSave = async () => {
        const jobData = {
            ...form,
            position: Number(form.position),
            experience: Number(form.experience),
            salaryMin: Number(form.salaryMin),
            salaryMax: Number(form.salaryMax),
            programmingLanguages: transformProgrammingLanguages(form.programmingLanguages),
        };
        if (onSubmit) {
            console.log('check jobData', jobData);
            await onSubmit(jobData);
        } else {
            console.log('check jobData creation', jobData);
            await dispatch(createJobDescription(jobData));
        }
    };

    useEffect(() => {
        dispatch(getProgrammingLanguages());
        dispatch(getJobPositions());
    }, []);

    return (
        <div className="mx-auto my-10 max-w-5xl rounded-lg border border-gray-300 bg-white p-8 shadow-xl">
            <div className="mb-8">
                <h1 className="text-center text-3xl font-semibold text-gray-900">
                    Create Job Posting
                </h1>
            </div>

            <div className="space-y-6">
                {/* Job Title */}
                <div>
                    <Label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                        Job Title <span className="text-red-500">*</span>
                    </Label>
                    <TextInput
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                        className="w-full rounded-lg border-gray-300 transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                </div>

                {/* Position and Experience */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="position"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Position <span className="text-red-500">*</span>
                        </Label>
                        <SelectInput
                            label=""
                            id="position"
                            value={form.position}
                            onChange={(val) => handleChange('position', val)}
                            options={[
                                { label: 'Select Position', value: '' },
                                ...convertToSelectOptions(jobPositions as any[]),
                            ]}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="experience"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Experience (years) <span className="text-red-500">*</span>
                        </Label>
                        <TextInput
                            id="experience"
                            name="experience"
                            type="number"
                            min="0"
                            max="50"
                            value={form.experience}
                            onChange={(e) => handleChange('experience', e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Level and Working Type */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="level"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Level <span className="text-red-500">*</span>
                        </Label>
                        <SelectInput
                            label=""
                            id="level"
                            value={form.level}
                            onChange={(val) => handleChange('level', val)}
                            options={LEVEL_OPTIONS}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="workingType"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Working Type <span className="text-red-500">*</span>
                        </Label>
                        <SelectInput
                            label=""
                            id="workingType"
                            value={form.workingType}
                            onChange={(val) => handleChange('workingType', val)}
                            options={WORKING_TYPE_OPTIONS}
                        />
                    </div>
                </div>

                {/* Contract Type and Salary */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="contractType"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Contract Type <span className="text-red-500">*</span>
                        </Label>
                        <SelectInput
                            label=""
                            id="contractType"
                            value={form.contractType}
                            onChange={(val) => handleChange('contractType', val)}
                            options={CONTRACT_TYPE_OPTIONS}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label
                                htmlFor="salaryMin"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Min Salary ($)
                            </Label>
                            <TextInput
                                name="salaryMin"
                                type="number"
                                min="0"
                                value={form.salaryMin}
                                onChange={(e) => handleChange('salaryMin', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="salaryMax"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Max Salary ($)
                            </Label>
                            <TextInput
                                name="salaryMax"
                                type="number"
                                min="0"
                                value={form.salaryMax}
                                onChange={(e) => handleChange('salaryMax', e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Programming Languages and Deadline */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label
                            htmlFor="programmingLanguage"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Required Skills
                        </Label>
                        <Select
                            isMulti
                            name="programmingLanguage"
                            value={
                                form.programmingLanguages?.map((lang) => ({
                                    value: lang?.id,
                                    label: lang?.name,
                                })) ?? []
                            }
                            options={convertToSelectOptions(programmingLanguages as any[])}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            onChange={handleSelectProgrammingLanguage}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: '42px',
                                    borderColor: '#d1d5db',
                                    '&:hover': {
                                        borderColor: '#d1d5db',
                                    },
                                }),
                            }}
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="endDate"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Application Deadline <span className="text-red-500">*</span>
                        </Label>
                        <Datepicker
                            id="endDate"
                            name="endDate"
                            minDate={new Date()}
                            value={form.endDate}
                            onChange={(date: Date | null) => {
                                if (date) {
                                    setForm({
                                        ...form,
                                        endDate: date,
                                    });
                                }
                            }}
                            className="w-full rounded-lg border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Job Description */}
                <div>
                    <Label
                        htmlFor="description"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Job Description <span className="text-red-500">*</span>
                    </Label>
                    <MarkdownEditor
                        value={form.description}
                        onChange={(value) => handleChange('description', value)}
                        className="rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                </div>

                {/* Status (disabled) */}
                <div>
                    <Label
                        htmlFor="status"
                        className="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Status
                    </Label>
                    <TextInput
                        type="text"
                        id="status"
                        value={form.status}
                        disabled
                        className="cursor-not-allowed rounded-lg bg-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <LoadingButton
                        isLoading={loading}
                        onClick={handleSave}
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                        {isEditing ? 'Update Job' : 'Post Job'}
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
