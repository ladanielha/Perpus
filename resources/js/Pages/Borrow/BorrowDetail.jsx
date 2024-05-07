import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate } from "@/Utils/UseFormatter";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function BorrowEdit({ borrow, errors }) {
    console.log(borrow.id);
    console.log(borrow.book_id);
    const [returnDate, setReturnDate] = useState("");
    const [bookId, setBookId] = useState(borrow.book.id);
    const [borrowId, setBorrowId] = useState(borrow.id);
    const [borrowDate, setBorrowDate] = useState(borrow.borrow_date);


    const returnBook = async (e) => {
        e.preventDefault();
        router.patch(
            `/borrow/return/${borrow.id}/${borrow.book.id}`,
            {
                returnDate,borrowDate,bookId,borrowId
            },
            {
                onSuccess: () => {
                    //show notif alert
                    Swal.fire({
                        title: "Success!",
                        text: "Data saved successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Borrow" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Return Book</div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={returnBook}>
                            <div className="space-y-12">
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Student
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-slate-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            readOnly
                                            disabled
                                            value={borrow.student.name}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 mb-6 md:mb-0 pl-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Book
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-slate-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            readOnly
                                            disabled
                                            value={borrow.book.name}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Borrow Date Book :
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-slate-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            readOnly
                                            disabled
                                            value={formatDate(
                                                borrow.borrow_date
                                            )}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3 mb-6 md:mb-0 pl-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Max Return Date Book :
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-slate-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            readOnly
                                            disabled
                                            value={formatDate(
                                                borrow.return_day
                                            )}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3 mb-6 md:mb-0 pl-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Input Return Date :
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="date"
                                            value={returnDate}
                                            onChange={(e) =>
                                                setReturnDate(e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.returnDate}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="border-b border-gray-900/10 pb-12 end-0 flex justify-end">
                                    <div>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Return Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
