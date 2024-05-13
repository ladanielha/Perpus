import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate, formatDatetime } from "@/Utils/UseFormatter";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth }) {
    const { borrows } = usePage().props;
    const [books, setBooks] = useState([]);
    const [month, setMonth] = useState(new Date());

    const handleSubmit = () => {
        console.log(month);

        router.get(`${report}?q=${month}`);
    };
    return (
        <AuthenticatedLayout>
            <Head title="Borrow" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Report</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-center border-b border-teal-500 py-2 object-position: right;">
                                    <input
                                        type="month"
                                        name="month"
                                        value={month}
                                        onChange={(e) =>
                                            setMonth(e.target.value)
                                        }
                                        className="bg-transparent border-none  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    />
                                    <PrimaryButton
                                        type="submit"
                                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                    >
                                        Search
                                    </PrimaryButton>
                                </div>
                            </form>
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
                                </tr>
                            </thead>
                            <tbody>
                                {borrows.data.map((borrow, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="text-center">
                                            {++index +
                                                (borrows.current_page - 1) *
                                                    borrows.per_page}
                                        </td>
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
                                            {formatDatetime(borrow.return_date)
                                                ? 
                                                formatDatetime(borrow.return_date)
                                                : "Not"
                                            }
                                        </td>
                                        <td className=" px-6 py-4">
                                            {formatDate(borrow.return_day)}
                                        </td>
                                        <td className=" px-6 py-4">
                                            <span
                                                className={`text-sm px-3 text-black rounded-full ${
                                                    borrow.status === "RETURN"
                                                        ? "bg-green-400 "
                                                        : "bg-red-400"
                                                }`}
                                            >
                                                {borrow.status === "RETURN"
                                                    ? "Return"
                                                    : "NotReturn"}
                                            </span>
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={borrows.links} align="center" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
