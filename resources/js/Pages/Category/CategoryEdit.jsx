import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CategoryEdit({ auth, errors, category }) {
    const [name, setName] = useState(category.name);
    const storeCategory = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            Swal.fire({
                title: "Error!",
                text: "Name field cannot be empty!",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            router.put(`/category/update/${category.id}`, { name });
            Swal.fire({
                title: "Success!",
                text: "Data saved successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            // Handle error
            console.error("Error:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Category" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Form Category Create
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeCategory}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        New Category
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {errors.name && (
                                        <div className="text-red-600">
                                            *{errors.name}
                                        </div>
                                    )}
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
