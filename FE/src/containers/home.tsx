import { Card } from 'flowbite-react';
import {
    FaRobot,
    FaSearch,
    FaChartLine,
    FaUpload,
    FaUserTie,
    FaShieldAlt,
    FaRegClock,
    FaRegCheckCircle,
    FaRegComments,
} from 'react-icons/fa';
import { MdOutlineWork, MdOutlineAutoAwesome } from 'react-icons/md';
import { BsGraphUp, BsDatabaseCheck } from 'react-icons/bs';

const Home = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="flex min-h-screen items-center bg-gradient-to-br from-blue-50 to-white px-6 py-20">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                            <MdOutlineAutoAwesome className="mr-2" /> AI-Powered Recruitment
                        </div>
                        <h1 className="text-5xl leading-tight font-bold">
                            Transform Your Hiring with{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Intelligent CV
                            </span>{' '}
                            Management
                        </h1>
                        <p className="text-xl text-gray-600">
                            Streamline your recruitment process with our AI-driven platform that
                            analyzes, evaluates, and matches developer CVs to your exact
                            requirements.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-100 opacity-30"></div>
                        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-blue-100 opacity-30"></div>
                        <img
                            src="https://resume.io/assets/landing/home/hero/hero-c5cd61805c7bfbfb6b968731e97cdebbad21e22c266ddfdb9af831bbfe5b8f1d.png"
                            alt="CV System Illustration"
                            className="relative z-10 h-auto w-full max-w-md rounded-xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Trusted By */}
            <section className="bg-white px-6 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="mb-8 text-center text-sm font-medium tracking-wider text-gray-500 uppercase">
                        Trusted by leading tech companies
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
                        <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-blue-100">
                            SETA
                        </div>
                        <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-blue-100">
                            TechCo
                        </div>
                        <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-blue-100">
                            DevHub
                        </div>
                        <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-blue-100">
                            CodeWave
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Powerful Features for Modern Hiring</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Our platform combines cutting-edge AI with intuitive design to
                            revolutionize your recruitment workflow.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaRobot className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">AI-Powered Analysis</h3>
                            <p className="text-gray-600">
                                Automatically extracts and evaluates skills, experience, and
                                qualifications from CVs with 95% accuracy.
                            </p>
                        </Card>
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaSearch className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Smart Matching</h3>
                            <p className="text-gray-600">
                                Algorithmically matches candidates to job descriptions based on
                                technical requirements and cultural fit.
                            </p>
                        </Card>
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaChartLine className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Candidate Ranking</h3>
                            <p className="text-gray-600">
                                Scores and ranks applicants objectively, highlighting top talent
                                based on your specific criteria.
                            </p>
                        </Card>
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <BsDatabaseCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Centralized Database</h3>
                            <p className="text-gray-600">
                                Securely stores all CVs in one searchable location with advanced
                                filtering capabilities.
                            </p>
                        </Card>
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <FaRegComments className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Collaborative Review</h3>
                            <p className="text-gray-600">
                                Share candidate profiles with team members and collect feedback in
                                one place.
                            </p>
                        </Card>
                        <Card className="transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <BsGraphUp className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Analytics Dashboard</h3>
                            <p className="text-gray-600">
                                Track hiring metrics and pipeline health with real-time visual
                                reports.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Streamlined Hiring Workflow</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Our platform simplifies every step of the recruitment process for both
                            candidates and recruiters.
                        </p>
                    </div>
                    <div className="mt-16 space-y-16">
                        {/* Step 1 */}
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                                    Step 1
                                </div>
                                <h3 className="text-2xl font-bold">Candidate Uploads CV</h3>
                                <p className="text-gray-600">
                                    Applicants easily upload their CVs in PDF or text format. Our
                                    system automatically parses and structures the information for
                                    analysis.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <FaUpload className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Multiple file format support</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FaRegCheckCircle className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Instant parsing confirmation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FaShieldAlt className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Secure document storage</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-inner">
                                <div className="absolute inset-0 m-4 rounded-xl border border-blue-100"></div>
                                <div className="relative z-10 w-3/4">
                                    <div className="h-48 rounded-lg bg-white p-4 shadow-md">
                                        <div className="mb-3 h-4 w-3/4 rounded bg-gray-200"></div>
                                        <div className="mb-3 h-4 w-1/2 rounded bg-gray-200"></div>
                                        <div className="mb-3 h-4 w-2/3 rounded bg-gray-200"></div>
                                        <div className="mb-3 h-4 w-1/4 rounded bg-gray-200"></div>
                                        <div className="mb-3 h-4 w-3/4 rounded bg-gray-200"></div>
                                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                                            <FaUpload className="mr-2" /> Upload CV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div className="relative order-2 flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-inner md:order-1">
                                <div className="absolute inset-0 m-4 rounded-xl border border-blue-100"></div>
                                <div className="relative z-10 w-3/4">
                                    <div className="h-48 rounded-lg bg-white p-4 shadow-md">
                                        <div className="mb-4 flex items-center">
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                <FaRobot />
                                            </div>
                                            <div>
                                                <div className="mb-2 h-4 w-24 rounded bg-blue-200"></div>
                                                <div className="h-3 w-16 rounded bg-gray-200"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">
                                                    Technical Skills
                                                </span>
                                                <span className="text-sm font-medium">
                                                    92% match
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-600"
                                                    style={{ width: '92%' }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">
                                                    Experience
                                                </span>
                                                <span className="text-sm font-medium">
                                                    85% match
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-600"
                                                    style={{ width: '85%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 space-y-6 md:order-2">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                                    Step 2
                                </div>
                                <h3 className="text-2xl font-bold">AI Evaluation & Matching</h3>
                                <p className="text-gray-600">
                                    Our advanced algorithms analyze each CV against the job
                                    requirements, scoring candidates on technical skills,
                                    experience, and cultural fit.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <FaRobot className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>
                                            Natural language processing for accurate parsing
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <MdOutlineWork className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Customizable evaluation criteria</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FaRegClock className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Reduces screening time by 70%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                                    Step 3
                                </div>
                                <h3 className="text-2xl font-bold">Recruiter Review & Decision</h3>
                                <p className="text-gray-600">
                                    Recruiters access pre-screened, ranked candidates with
                                    comprehensive profiles and AI-generated interview suggestions.
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <FaUserTie className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Collaborative evaluation tools</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FaRegComments className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>Custom feedback templates</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FaRegCheckCircle className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                                        <span>One-click candidate status updates</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-inner">
                                <div className="absolute inset-0 m-4 rounded-xl border border-blue-100"></div>
                                <div className="relative z-10 w-3/4">
                                    <div className="h-48 rounded-lg bg-white p-4 shadow-md">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    JD
                                                </div>
                                                <div>
                                                    <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
                                                    <div className="h-3 w-16 rounded bg-gray-200"></div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    ✓
                                                </button>
                                                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 w-full rounded bg-gray-200"></div>
                                            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                                            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 text-3xl font-bold">
                        Ready to Transform Your Hiring Process?
                    </h2>
                    <p className="mb-8 text-xl opacity-90">
                        Join dozens of companies who have streamlined their recruitment with our
                        AI-powered CV management system.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
