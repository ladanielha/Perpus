import Delete from "@/Components/Delete";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate, formatDatetime } from "@/Utils/UseFormatter";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    const { books } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Books" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Book List</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <Search URL={"/books"} />
                            <Link
                                href="/books/create"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Book
                            </Link>
                        </div>
                        <table className="min-w-full text-center text-lg font-light text-surface text-black">
                            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" className=" px-6 py-4">
                                        No
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Title
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Author
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Publisher
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Category
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Location
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Status
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Date Book In
                                    </th>
                                    <th scope="col" className=" px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.data.map((book, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="text-center">
                                            {++index +
                                                (books.current_page - 1) *
                                                    books.per_page}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {book.name}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {book.author}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {book.category.name}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {book.publisher.name}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {book.location.name}
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            <span
                                                className={`border rounded-md px-2 py-2 text-sm ${
                                                    book.status === "AVAILABLE"
                                                        ? "bg-green-400 "
                                                        : "bg-red-400"
                                                }`}
                                            >
                                                {book.status === "AVAILABLE"
                                                    ? "Available"
                                                    : "NotAvailable"}
                                            </span>
                                        </td>
                                        <td className="whitespace-wrap  px-6 py-4">
                                            {formatDatetime(book.created_at)}
                                        </td>
                                        <td className="whitespace-nowrap gap-2 px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`books/edit/${book.id}`}
                                                >
                                                    <PrimaryButton>
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>
                                                <Delete
                                                    URL={"/books/delete"}
                                                    id={book.id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={books.links} align="center" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
