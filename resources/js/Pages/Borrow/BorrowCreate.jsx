import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({
    errors,
    books,
    students,
}) {
    console.log(errors);
    console.log(books, students);
    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [maxReturnDate, setMaxReturnDate] = useState("");
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
        console.log(
            
            selectedStudent,
            selectedBook
        );
        router.post(
            "/borrow/store",
            { borrowDate, returnDate, maxReturnDate,selectedBook, selectedStudent},
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
            })
    };

    return (
        <AuthenticatedLayout
        >
            <Head title="Borrow" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Form Borrow Create
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeBorrow} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        New Borrow
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Borrow Date Book :
                                                </label>
                                                <input
                                                    type="date"
                                                    name="borrowDate"
                                                    id="borrowDate"
                                                    value={borrowDate}
                                                    onChange={(e) =>
                                                        setBorrowDate(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.borrowDate} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Return Date :
                                                </label>
                                                <input
                                                    type="date"
                                                    name="returnDate"
                                                    id="returnDate"
                                                    value={returnDate}
                                                    onChange={(e) =>
                                                        setReturnDate(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.returnDate} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Max Return Date :
                                                </label>
                                                <input
                                                    type="date"
                                                    name="maxReturnDate"
                                                    id="maxReturnDate"
                                                    value={maxReturnDate}
                                                    onChange={(e) =>
                                                        setMaxReturnDate(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.maxReturnDate} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Choose Student :
                                                </label>
                                                <select
                                                    value={selectedStudent}
                                                    onChange={
                                                        handleStudentChange
                                                    }
                                                    className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="">
                                                        Select Student
                                                    </option>
                                                    {students.map((student) => (
                                                        <option key={student.id}
                                                                value={student.id}
                                                            >
                                                                {student.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <InputError message={errors.selectedStudent} className="mt-2" />
                                        </div>
                                
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Choose Book
                                                </label>
                                                <select
                                                    value={selectedBook}
                                                    onChange={
                                                        handleBookChange
                                                    }
                                                    className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="">
                                                        Select Book
                                                    </option>
                                                    {books.map((book) => (
                                                        <option key={book.id}
                                                                value={book.id}
                                                            >
                                                                {book.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <InputError message={errors.selectedStudent} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <i className="fa fa-redo"></i>{" "}
                                            Submit
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
