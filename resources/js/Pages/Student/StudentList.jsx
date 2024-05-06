import Delete from "@/Components/Delete";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const { students } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Student" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Student List</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <Search URL={"/student"} />
                            <Link
                                href="/student/create"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Student
                            </Link>
                        </div>
                        <table className="min-w-full text-center text-lg font-light text-surface text-black">
                            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" className=" px-6 py-4">
                                        No
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        E-mail
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Phone
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Address
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Class
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.map((student, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="text-center">
                                            {++index +
                                                (students.current_page - 1) *
                                                    students.per_page}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {student.name}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {student.email}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {student.phone}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {student.address}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {student.class}
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`student/edit/${student.id}`}
                                                >
                                                    <PrimaryButton>
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>
                                                <Delete
                                                    URL={"/student/delete"}
                                                    id={student.id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={students.links} align="center" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
