import Delete from "@/Components/Delete";
import Search from "@/Components/Search";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function PublisherList() {
    const { publishers } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Publisher" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">Publishers List</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <Search URL={"/publisher"} />
                            <Link
                                href="/publisher/create"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add publishers
                            </Link>
                        </div>
                        <table className="min-w-full text-center text-md font-light text-surface text-black">
                            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Publishers Name
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {publishers.data.map((publisher, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {++index}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {publisher.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link
                                                className="px-2 py-2 bg-yellow-400 border rounded-md hover:bg-yellow-800 hover:text-white"
                                                href={`publisher/edit/${publisher.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Delete
                                                URL={"/publisher/delete"}
                                                id={publisher.id}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={publishers.links} align="center" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
