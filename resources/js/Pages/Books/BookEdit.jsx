import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function BookEdit({
    auth,
    errors,
    book,
    categories,
    locations,
    publishers,
}) {
    console.log(book);
    const [name, setName] = useState(book.name);
    const [authorname, setAuthor] = useState(book.author);
    const [selectedCategories, setSelectedCategories] = useState(book.category);
    const [selectedLocation, setSelectedLocation] = useState(book.location);
    const [selectedPublisher, setSelectedPublisher] = useState(book.publisher);
    const [status, setSelectedStatus] = useState(book.status);


    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategories(e.target.value);
    };

    const handlePublisherChange = (e) => {
        setSelectedPublisher(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const storeBook = async (e) => {
        e.preventDefault();
        console.log(
            name,
            authorname,
            selectedCategories,
            selectedLocation,
            selectedPublisher
        );
        router.post(
            "/books/update",
            {
                name,
                authorname,
                selectedCategories,
                selectedLocation,
                selectedPublisher,
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
        // Your logic for storing book
    };

    return (
        <AuthenticatedLayout
        >
            <Head title="Books" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Form Edit Book
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeBook}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        New Books
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Title Book :
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
                                                    Book Author :
                                                </label>
                                                <input
                                                    type="text"
                                                    name="authorname"
                                                    id="authorname"
                                                    value={authorname}
                                                    onChange={(e) =>
                                                        setAuthor(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError message={errors.authorname} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Publisher
                                                </label>
                                                <select
                                                    value={selectedPublisher}
                                                    onChange={
                                                        handlePublisherChange
                                                    }
                                                    className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                >
                                                    <option value={book.publisher}>
                                                        {book.publisher.name}
                                                    </option>
                                                    {publishers.map(
                                                        (publisher) => (
                                                            <option
                                                                key={
                                                                    publisher.id
                                                                }
                                                                value={
                                                                    publisher.id
                                                                }
                                                            >
                                                                {publisher.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <InputError message={errors.selectedPublisher} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-bold">
                                                    Category
                                                </label>
                                                <select
                                                    value={selectedCategories}
                                                    onChange={
                                                        handleCategoryChange
                                                    }
                                                    className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="">
                                                        Select Location
                                                    </option>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                key={
                                                                    category.id
                                                                }
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <InputError message={errors.selectedCategories} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Location
                                                    </label>
                                                    {locations.map(
                                                        (location) => (
                                                            <div
                                                                key={
                                                                    location.id
                                                                }
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id={`location-${location.id}`}
                                                                    name="location"
                                                                    value={
                                                                        location.id
                                                                    }
                                                                    checked={
                                                                        selectedLocation ===
                                                                        location.id
                                                                    }
                                                                    onChange={
                                                                        handleLocationChange
                                                                    }
                                                                    className="mr-2"
                                                                />
                                                                <label
                                                                    htmlFor={`location-${location.id}`}
                                                                    className="mr-4"
                                                                >
                                                                    {
                                                                        location.name
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <InputError message={errors.selectedLocation} className="mt-2" />
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
