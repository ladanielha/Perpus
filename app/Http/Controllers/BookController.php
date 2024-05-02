<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Publisher;
use PharIo\Manifest\Author;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::when(request()->q, function ($books) {
            $books = $books->where('name', 'like', '%' . request()->q . '%');
        })->with('publisher', 'category', 'location')->latest()->paginate(5);
        $books->appends(['q' => request()->q]);
        return Inertia::render('Books/BookList', [
            'books' => $books,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = Category::get();
        $location = Location::get();
        $publisher = Publisher::get();
        return Inertia::render('Books/BookCreate', [
            'categories' => $category,
            'locations' => $location,
            'publishers' => $publisher,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);
        /**
         * Validate request books
         */
        $request->validate([
            'name' => 'required|min:3|max:100',
            'authorname' => 'required|min:3|max:100',
            'selectedCategories' => 'required',
            'selectedLocation' => 'required',
            'selectedPublisher' => 'required',
        ]);

        $books = Book::create([
            'name' => $request->name,
            'author' => $request->authorname,
            'category_id' => $request->selectedCategories,
            'location_id' => $request->selectedLocation,
            'publisher_id' => $request->selectedPublisher,
            'status' => 'AVAILABLE',
        ]);

        //redirect
        return redirect()->route('books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::get();
        $location = Location::get();
        $publisher = Publisher::get();
        $book = Book::with('publisher', 'category', 'location')->findOrFail($id);
        return Inertia::render('Books/BookEdit', [
            'book' => $book,
            'categories' => $category,
            'locations' => $location,
            'publishers' => $publisher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        /**
         * Validate request books
         */
        $request->validate([
            'name' => 'required|min:3|max:100',
            'authorname' => 'required|min:3|max:100',
            'selectedCategories' => 'required',
            'selectedLocation' => 'required',
            'selectedPublisher' => 'required',
        ]);

        $books = Book::find($id);
        $books->name = $request->name;
        $books->author = $request->authorname;
        $books->category_id = $request->selectedCategories;
        $books->location_id = $request->selectedLocation;
        $books->publisher_id = $request->selectedPublisher;
        //$books->status = $request->status;
        $books->save();

        //redirect
        return redirect()->route('books.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //Get books by id
        $book = Book::findOrFail($id);
        //Delete books
        $book->delete();
        //Redirect to books index
        return redirect()->route('books.index');
    }
}
