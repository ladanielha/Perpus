<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublisherController extends Controller
{
    /**
     * Display a listing of the student.
     */   
    public function index()
    {
        $publisher = Publisher::when(request()->q, function ($publisher) {
            $publisher = $publisher->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);
        $publisher->appends(['q' => request()->q]);
        return Inertia::render('Publisher/PublisherList', [
            'publishers' => $publisher,
        ]);
    }

     /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         return Inertia::render('Publisher/PublisherCreate', [
         ]);
    }

        /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /**
         * Validate request publisher
         */
        $request->validate([
            'name'       => 'required',
        ]);
        //create publisher
        $publisher = Publisher::create([
            'name'  => $request->name,
        ]);
        //redirect
        return redirect()->route('publisher.index');
    }

     /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $publisher = Publisher::findOrFail($id);
        return Inertia::render('Publisher/PublisherEdit', [
            'publisher' => $publisher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
         /**
         * Validate request publisher
         */
        $request->validate([
            'name'       => 'required',
        ]);
        $publisher = Publisher::find($id);
        $publisher->name = $request->name;
        $publisher->save();
        //redirect
        return redirect()->route('publisher.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //Get books by id
        $student = Publisher::findOrFail($id);
        //Delete student
        $student->delete();
        //Redirect to books index
        return redirect()->route('publisher.index');
    }
}
