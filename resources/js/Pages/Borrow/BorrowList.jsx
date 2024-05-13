import Delete from "@/Components/Delete";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Search from "@/Components/Search";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate, formatDatetime } from "@/Utils/UseFormatter";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function BorrowList({ auth }) {
    const { borrows, errors } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [selectedBorrowId, setSelectedBorrowId] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [setdata, setData] = useState(null);

    // const handleReturnClick = (bookId) => {
    //     console.log(bookId.id);
    //     setData(bookId);
    //     setReturnDate("");
    //     setSelectedBorrowId(bookId.id);
    //     setSelectedBook(bookId.book_id);
    //     setModalOpen(true);
    // };
    // const handleCloseModal = () => {
    //     setModalOpen(false);
    // };
    // const handleOpenModal = () => {
    //     setModalOpen(true);
    // };
    // const handleReturnConfirm = () => {
    //     console.log("Return Date:", returnDate);
    //     console.log("Selected Book:", selectedBook);
    //     router.put(
    //         `/borrow/return/${selectedBorrowId}/${selectedBook}`,
    //         {
    //             returnDate,
    //             selectedBook,
    //             borrowData: setdata, // Assuming setdata contains the data from borrow[0]
    //         },
    //         {
    //             onSuccess: () => {
    //                 //show notif alert
    //                 Swal.fire({
    //                     title: "Success!",
    //                     text: "Book Return successfully!",
    //                     icon: "success",
    //                     showConfirmButton: false,
    //                     timer: 1500,
    //                 });
    //                 setModalOpen(false); // Close the modal on success
    //             },
    //         }
    //     );
    // };

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
                                        <td className="px-6 py-4">
                                            {borrow.return_date
                                                ? formatDatetime(
                                                      borrow.return_date
                                                  )
                                                : "-"}
                                        </td>
                                        <td className=" px-6 py-4">
                                            {formatDate(borrow.return_day)}
                                        </td>
                                        <td className=" px-6 py-4">
                                            <span
                                                className={`text-sm px-3 text-black rounded-full ${
                                                    borrow.status === "RETURN"
                                                        ? "bg-green-400"
                                                        : "bg-red-400"
                                                }`}
                                            >
                                                {borrow.status === "RETURN"
                                                    ? "Return"
                                                    : "NotReturn"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex gap-2 justify-center">
                                                {borrow.status === "RETURN" ? (
                                                    ""
                                                ) : (
                                                    <Link
                                                        href={`borrow/${borrow.id}/${borrow.book.id}}`}
                                                        className="border-spacing-3 "
                                                    >
                                                        <PrimaryButton className=" bg-yellow-600">
                                                            Return
                                                        </PrimaryButton>
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`borrow/edit/${borrow.id}`}
                                                    className="border-spacing-3 "
                                                >
                                                    <PrimaryButton>
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>
                                                {borrow.status === "RETURN" ? (
                                                    ""
                                                ) : (
                                                    <Delete
                                                        URL={"/borrow/delete"}
                                                        id={borrow.id}
                                                    />
                                                )}
                                            </div>
                                            {/* <Modal
                                                show={modalOpen}
                                                onClose={handleCloseModal}
                                                maxWidth="md"
                                            >
                                                <div className="p-6">
                                                    <h2 className="text-lg font-bold mb-4">
                                                        Confirm Return
                                                    </h2>
                                                    <div className="w-full ">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                            Return Date:
                                                        </label>
                                                        <input
                                                            autoFocus
                                                            className="block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            type="date"
                                                            value={returnDate}
                                                            onChange={(e) =>
                                                                setReturnDate(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.returnDate
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <p>Return this Book ?</p>
                                                    <div className="flex justify-end mt-4 ">
                                                        <PrimaryButton
                                                            onClick={
                                                                handleReturnConfirm
                                                            }
                                                            className="bg-blue-500 overflow-hidden hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
                                                        >
                                                            Confirm
                                                        </PrimaryButton>
                                                        <button
                                                            onClick={
                                                                handleCloseModal
                                                            }
                                                            className="bg-red-600 border rounded-md hover:bg-orange-800 text-white px-4 py-2"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </Modal> */}
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
