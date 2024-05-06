import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CategoryCreate({ auth, errors }) {
    const [name, setName] = useState("");
    console.log(errors);
    const storeBook = async (e) => {
        e.preventDefault();
        router.post(
            "/category/store",
            { name },
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
            <Head title="Category-" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Form Category Create
                        </div>
                    </div>
                    <div className="p-6">
                        <form onSubmit={storeBook} className="space-y-12">
                            <div className="border-b border-gray-900/10">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-center">
                                            <label
                                                htmlFor="name"
                                                className="form-label font-bold"
                                            >
                                                Category:
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="text-red-600">
                                                *{errors.name}
                                            </div>
                                        )}
                                        <PrimaryButton
                                            type="Submit"
                                            className="rounded-md bg-indigo-600"
                                        >
                                            Submit
                                        </PrimaryButton>
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
