import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Setting({ auth, errors, setting }) {
    const [returndays, setReturnDays] = useState(setting.return_days);
    const storeDays = async (e) => {
        e.preventDefault();

        if (!returndays.trim()) {
            Swal.fire({
                title: "Error!",
                text: "Days field cannot be empty!",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        try {
            router.put(`/settingrules/edit/${setting.id}`,{returndays});
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
        <AuthenticatedLayout>
            <Head title="Rules" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Rules Return Day
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeDays}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Setting how long the borrowing period
                                    </h2>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div class="w-full md:w-1/2 mb-6 md:mb-0 flex-row">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Day's
                                    </label>
                                    <input
                                        class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        type="number"
                                        placeholder=""
                                        name="returndays"
                                        value={returndays}
                                        onChange={(e) =>
                                            setReturnDays(e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.returndays}
                                        className="mt-2"
                                    />
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
