import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import PrimaryButton from "./PrimaryButton";

export default function Delete({ URL, id }) {

	//method destroy
    const destroy = async (id) => {

        //show sweet alert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                //delete
                router.delete(`${URL}/${id}`)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data deleted successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }

    return (
    	<>
    		<PrimaryButton 
            className="px-2 py-2 bg-red-600 border rounded-md hover:bg-orange-800 text-white"
            onClick={() => destroy(id)} >Delete</PrimaryButton>
    	</>
    )

}