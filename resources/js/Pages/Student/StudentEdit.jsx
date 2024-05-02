import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Dashboard({ auth, errors, }) {
    const { student } = usePage().props;

    console.log(errors);
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);
    const [phone, setPhone] = useState(student.phone);
    const [address, setAddress] = useState(student.address);
    const [classes, setClasses] = useState(student.class);

    const storeStudent = async (e) => {
        e.preventDefault();
        console.log(
            name,
            email,
            phone,
            address,
            classes,
          
        );
        router.put(
            `/student/edit/${student.id}`,
            {
                name,
                email,
                phone,
                address,
                classes,
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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Student" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Form Student Create
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeStudent}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        New Student
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Name :
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
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                        <InputError message={errors.email} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Phone :
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="phone"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={address}
                                                    onChange={(e) =>
                                                        setAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.address} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Student Class :
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="classes"
                                                    id="classes"
                                                    value={classes}
                                                    onChange={(e) =>
                                                        setClasses(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.classes} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="Submit"
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
