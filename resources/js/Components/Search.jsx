import React, { useState } from "react";
import { router } from '@inertiajs/react';
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

export default function Search({ URL }) {
    const [search, setSearch] = useState('');
    const searchHandler = (e) => {
        e.preventDefault();
        performSearch();
    }
    const performSearch = () => {
        router.get(`${URL}?q=${search}`);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    }

    return (
        <>
            <form onSubmit={searchHandler}>
                <div className="flex items-center border-b border-teal-500 py-2 object-position: right;">
                    <TextInput 
                        type="text" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className="bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        placeholder="Search..."
                        onKeyPress={handleKeyPress}
                    />
                    <PrimaryButton 
                        type="submit" 
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </PrimaryButton>
                </div>
            </form>
        </>
    )
}
