import Delete from "@/Components/Delete";
import Pagination from "@/Components/Pagination";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function CategoryList() {
    const { categories ,errors,info,flash,failed} = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Category" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 text-gray-900">Category List</div>
                        <div className="flex justify-between items-center px-6 py-4">
                            <Search URL={"/category"} />
                            <Link
                                href="/category/create"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add Category
                            </Link>
                        </div>
                        <table className="min-w-full text-center text-md font-light text-surface text-black">
                            <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Category Name
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((category, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-neutral-200 dark:border-white/10"
                                    >
                                        <td className="text-center">{++index + (categories.current_page-1) * categories.per_page}</td>
                                        <td className="whitespace-wrap px-6 py-4">
                                            {category.name}
                                        </td>
                                        <td className="whitespace-wrap px-6 py-4">
                                            <Link
                                                className="px-2 py-2 bg-yellow-400 border rounded-md hover:bg-yellow-800 hover:text-white"
                                                href={`category/edit/${category.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <Delete
                                                URL={"/category/delete"}
                                                id={category.id}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={categories.links} align="center" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
