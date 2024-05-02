import Delete from "@/Components/Delete";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate, formatDatetime } from "@/Utils/UseFormatter";
import { Head, Link, usePage } from "@inertiajs/react";

export default function BorrowList({ auth }) {
    const { borrows } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Borrow" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Borrow List</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <Search URL={"/borrow"} />
                            <Link
                                href="/borrow/create"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Borrow 
                            </Link>
                        </div>
                        <table className="min-w-full text-center text-lg font-light text-surface text-black">
                            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" className=" px-6 py-4">
                                        No
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Book Name
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Student Name
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Borrow Date
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Return Date
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Max Return Date
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Status
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrows.data.map((borrow, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="text-center">{++index + (borrows.current_page-1) * borrows.per_page}</td>
                                        <td className=" px-6 py-4">
                                            {borrow.book.name}
                                        </td>
                                        <td className=" px-6 py-4">
                                            {borrow.student.name}
                                        </td>
                                        <td className=" px-6 py-4">
                                            {formatDate(borrow.borrow_date)}
                                        </td>
                                        <td className=" px-6 py-4">
                                            {formatDatetime(borrow.return_date) ? formatDatetime(borrow.return_date) : 'Not' }
                                        </td>
                                        <td className=" px-6 py-4">
                                            {formatDate(borrow.return_day)}
                                        </td>
                                        <td className=" px-6 py-4">
                                            <span className={`border rounded-md px-2 py-2 text-sm ${borrow.status === 'RETURN' ? 'bg-green-400 ' : 'bg-red-400'}`}>
                                                {borrow.status === 'RETURN' ? 'Return' : 'NotReturn'}
                                            </span>
                                        </td>
                                        <td className=" px-6 py-4">
                                            <Link
                                                className="px-2 py-2 bg-yellow-400 border rounded-md hover:bg-yellow-800 hover:text-white"
                                                href={`borrow/edit/${borrow.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Delete
                                                URL={"/borrow/delete"}
                                                id={borrow.id}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={borrows.links} align="center"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
