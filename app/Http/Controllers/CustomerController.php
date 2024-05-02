<?php

namespace App\Http\Controllers;

use App\Models\cr;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::when(request()->q, function ($customers) {
            $customers = $customers->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);
        $customers->appends(['q' => request()->q]);
        return Inertia::render('Customer/CustomerList', [
            'customers' => $customers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/CustomerCreate', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          /**
         * Validate request customers
         */
        $request->validate([
            'name'       => 'required',
            'address'   => 'required',
            'phone'    => 'required',
            'email'     => 'required',
            'status'    => 'required',
        ]);

        //create books
        $customer = Customer::create([
            'name'  => $request->name,
            'address'  => $request->address,
            'phone'  => $request->phone,
            'email'  => $request->email,
            'status'  => $request->status,
        ]);

        return redirect()->route(('customer.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $customer= Customer::findOrFail($id);
         // Return data using Inertia
         return Inertia::render('Books/BookEdit', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        /**
         * Validate request customers
         */
        $request->validate([
            'name'       => 'required',
            'address'   => 'required',
            'phone'    => 'required',
            'email'     => 'required',
            'status'    => 'required',
        ]);

        //create books
        $customer = Customer::create([
            'name'  => $request->name,
            'address'  => $request->address,
            'phone'  => $request->phone,
            'email'  => $request->email,
            'status'  => $request->status,
        ]);

        return redirect()->route(('customer.index'));

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //Get customer by
        $customer = Customer::findOrFail($id);
        //Delete customer
        $customer->delete();
        //Redirect to customer index
        return redirect()->route('customer.index');
    }
}
