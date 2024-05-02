import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const {publishers, categories, books, students,borrow_books } = usePage().props
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Publisher : {publishers}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Category : {categories}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Students : {students}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Books : {books}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Borrowed Books :{borrow_books}</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 text-gray-900">Report : 3 Month</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
