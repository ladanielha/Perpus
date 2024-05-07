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
    const [name, setName] = useState(book.name);
    const [authorname, setAuthor] = useState(book.author);
    const [selectedCategories, setSelectedCategories] = useState(book.category.id);
    const [selectedLocation, setSelectedLocation] = useState(book.location.id);
    const [selectedPublisher, setSelectedPublisher] = useState(book.publisher.id);

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategories(e.target.value);
    };

    const handlePublisherChange = (e) => {
        setSelectedPublisher(e.target.value);
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
        router.put(
            `/books/update/${book.id}`,
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
        <AuthenticatedLayout>
            <Head title="Books" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Form Edit Book</div>
                    </div>
                    <div className="p-6 text-gray-900">
                        <form onSubmit={storeBook}>
                            <div className="space-y-12">
                                <div class="flex flex-wrap">
                                    <div class="w-full md:w-1/2 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Book Title
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                        
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/2 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Book Author
                                        </label>
                                        <input
                                            class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            
                                            value={authorname}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.authorname}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-wrap">
                                    <div class="w-full md:w-1/3 mb-6 md:mb-0">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Publisher
                                        </label>
                                        <select
                                            value={selectedPublisher}
                                            onChange={handlePublisherChange}
                                            className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value={book.publisher.id}>
                                                {book.publisher.name}
                                            </option>
                                            {publishers.map((publisher) => (
                                                <option
                                                    key={publisher.id}
                                                    value={publisher.id}
                                                >
                                                    {publisher.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.selectedPublisher}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/3 px-3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={selectedCategories}
                                            onChange={handleCategoryChange}
                                            className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value={book.category.id}>
                                                {book.category.name}
                                            </option>
                                            {categories.map((category, key) => (
                                                <option
                                                    key={key}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.selectedCategories}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div class="w-full md:w-1/3">
                                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Location
                                        </label>
                                        <select
                                            value={selectedLocation}
                                            onChange={handleLocationChange}
                                            className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value={book.location.id}>
                                                {book.location.name}
                                            </option>
                                            {locations.map((location) => (
                                                <option
                                                    key={location.id}
                                                    value={location.id}
                                                >
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.selectedLocation}
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
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
