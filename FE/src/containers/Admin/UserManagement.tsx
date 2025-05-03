import { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Spinner,
    Badge,
    Pagination,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell,
} from 'flowbite-react';
import { HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersPaginated, updateUser, deleteUser } from '../../store/userThunk';
import { AppDispatch, RootState } from '../../store/store';
import { UserEditerModal } from '../../components/UserEditerModal';
import { ROLE_MAP } from '../../helpers/constant';
import ConfirmModal from '../../components/ConfirmModal';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

const AdminUserManagement = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        usersPaginated: userList,
        totalUsers,
        loading: isLoading,
    } = useSelector((state: RootState) => state.users);

    const [searchParams, setSearchParams] = useSearchParams();

    // modal state
    const [isOpenUserEditer, setIsOpenUserEditer] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserWithoutPassword | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserWithoutPassword | null>(null);

    // search state
    const [searchText, setSearchText] = useState(searchParams.get('search') || '');
    const [debouncedSearchText] = useDebounce(searchText, 500);
    const [filterRole, setFilterRole] = useState(searchParams.get('role') || '');
    const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || '');

    // pagination state
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page') || 1));
    const [pageSize] = useState(Number(searchParams.get('limit') || 5));

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any = {};

        if (searchText) params.search = searchText;
        if (filterRole) params.role = filterRole;
        if (filterStatus) params.status = filterStatus;
        params.page = currentPage;
        params.limit = pageSize;

        setSearchParams(params);

        const fetchData = async () => {
            try {
                await dispatch(
                    fetchUsersPaginated({
                        page: currentPage,
                        limit: pageSize,
                        search: debouncedSearchText,
                        role: filterRole ? parseInt(filterRole) : undefined,
                        status: filterStatus ? parseInt(filterStatus) : undefined,
                    })
                );
            } catch (err) {
                console.error('Error loading users:', err);
            }
        };
        fetchData();
    }, [dispatch, currentPage, debouncedSearchText, filterRole, filterStatus, pageSize]);

    const handleEditUser = async (data: UserWithoutPassword) => {
        await dispatch(updateUser({ data }));
    };

    const handleDeleteUser = async (userId: number) => {
        await dispatch(deleteUser(userId));
    };

    return (
        <div className="mx-auto my-10 w-full max-w-6xl rounded-xl bg-white p-6 shadow">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">User Management</h2>

            {isLoading ? (
                <div className="flex justify-center py-10">
                    <Spinner size="xl" color="info" />
                </div>
            ) : (
                <>
                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <select
                                value={filterRole}
                                onChange={(e) => {
                                    setFilterRole(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                            >
                                <option value="">All roles</option>
                                {Object.entries(ROLE_MAP).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
                            >
                                <option value="">All status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <TableHead>
                                <TableHeadCell>Name</TableHeadCell>
                                <TableHeadCell>Email</TableHeadCell>
                                <TableHeadCell>Role</TableHeadCell>
                                <TableHeadCell>Status</TableHeadCell>
                                <TableHeadCell className="text-center">Actions</TableHeadCell>
                            </TableHead>
                            <TableBody className="divide-y">
                                {userList.map((user) => (
                                    <TableRow key={user.id} className="bg-white">
                                        <TableCell className="font-medium text-gray-900">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className="flex justify-center"
                                                color={
                                                    user.role_id === 1
                                                        ? 'info'
                                                        : user.role_id === 2
                                                          ? 'purple'
                                                          : 'success'
                                                }
                                            >
                                                {ROLE_MAP[user.role_id]}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className="flex justify-center"
                                                color={user.is_active ? 'success' : 'failure'}
                                            >
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="flex justify-center gap-2">
                                            <Button
                                                className="cursor-pointer"
                                                size="xs"
                                                color="light"
                                                onClick={() => {
                                                    setSelectedUser({
                                                        id: user.id,
                                                        email: user.email,
                                                        name: user.name,
                                                        role_id: user.role_id,
                                                        is_active: user.is_active,
                                                    });
                                                    setIsOpenUserEditer(true);
                                                }}
                                            >
                                                <HiOutlinePencilAlt className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="xs"
                                                color="failure"
                                                className="cursor-pointer transition-all hover:bg-red-500 hover:text-white"
                                                onClick={() => {
                                                    setUserToDelete({
                                                        id: user.id,
                                                        email: user.email,
                                                        name: user.name,
                                                        role_id: user.role_id,
                                                        is_active: user.is_active,
                                                    });
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <HiOutlineTrash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(totalUsers / pageSize)}
                            onPageChange={setCurrentPage}
                            showIcons
                        />
                    </div>
                    <UserEditerModal
                        isOpen={isOpenUserEditer}
                        setIsOpen={setIsOpenUserEditer}
                        userData={selectedUser}
                        onSave={handleEditUser}
                    />
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        setIsOpen={setIsDeleteModalOpen}
                        message={`Are you sure you want to deactive user "${userToDelete?.name}"?`}
                        confirmText="Yes, deactive"
                        cancelText="Cancel"
                        onConfirm={() => {
                            if (userToDelete?.id) {
                                handleDeleteUser(userToDelete.id);
                            }
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default AdminUserManagement;
