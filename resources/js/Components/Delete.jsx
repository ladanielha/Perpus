//import react  
import React from "react";

//import inertia router
import { router } from '@inertiajs/react';

//import Sweet Alert
import Swal from 'sweetalert2';

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
    		<button 
            className="px-2 py-2 bg-red-600 border rounded-md hover:bg-orange-800 text-white"
            onClick={() => destroy(id)} ><i className="fa fa-trash"></i>Delete</button>
    	</>
    )

}