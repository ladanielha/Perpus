import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({ errors, books, students }) {
    const [borrowDate, setBorrowDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedBook, setSelectedBook] = useState("");

    const handleStudentChange = (e) => {
        setSelectedStudent(e.target.value);
    };

    const handleBookChange = (e) => {
        setSelectedBook(e.target.value);
    };

    const storeBorrow = async (e) => {
        e.preventDefault();
        console.log(borrowDate, selectedStudent, selectedBook);
        router.post(
            "/borrow/store",
            {
                borrowDate,
                selectedBook,
                selectedStudent,
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
                        <div className="p-6 text-gray-900">
                            Form Borrow Create
                        </div>
                    </div>
                    <div className="py-6 text-gray-900">
                        <form onSubmit={storeBorrow}>
                            <div className="space-y-12">
                                <div class="flex flex-wrap py-4">
                                    <div class="w-full md:w-1/2 mb-6 md:mb-0 pr-2">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Select Student
                                        </label>
                                        <select
                                            value={selectedStudent}
                                            onChange={handleStudentChange}
                                            className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">
                                                Select Student
                                            </option>
                                            {students.map((student) => (
                                                <option
                                                    key={student.id}
                                                    value={student.id}
                                                >
                                                    {student.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.selectedStudent}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/2 mb-6 md:mb-0 pl-2">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Select Book
                                        </label>
                                        <select
                                            value={selectedBook}
                                            onChange={handleBookChange}
                                            className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">
                                                Select Book
                                            </option>
                                            {books.map((book) => (
                                                <option
                                                    key={book.id}
                                                    value={book.id}
                                                >
                                                    {book.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.selectedBook}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-wrap justify-end">
                                    <div class="w-full md:w-1/3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Borrow Date Book :
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            type="date"
                                            value={borrowDate}
                                            onChange={(e) =>
                                                setBorrowDate(e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.borrowDate}
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
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-12"></div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
