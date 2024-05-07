<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Publisher;
use Illuminate\Support\Facades\DB;
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
        try {
            DB::beginTransaction();
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
            DB::commit();
            return redirect()->route('books.index');
        } catch (\Exception $exception) {
            DB::rollBack();

            return redirect()->back()->withInput()->withErrors(['error' => $exception->getMessage()]);
        }

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
        try {
            DB::beginTransaction();
            // Validasi input
            $request->validate([
                'name' => 'required|min:3|max:100',
                'authorname' => 'required|min:3|max:100',
                'selectedCategories' => 'required',
                'selectedLocation' => 'required',
                'selectedPublisher' => 'required',
            ]);
            $book = Book::findOrFail($id);
            if (
                $request->name != $book->name ||
                $request->authorname != $book->author ||
                $request->selectedCategories != $book->category_id ||
                $request->selectedLocation != $book->location_id ||
                $request->selectedPublisher != $book->publisher_id
            ) {
                $book->name = $request->name;
                $book->author = $request->authorname;
                $book->category_id = $request->selectedCategories;
                $book->location_id = $request->selectedLocation;
                $book->publisher_id = $request->selectedPublisher;
                $book->save();
                DB::commit();
                return redirect()->route('books.index');
            }
        } catch (\Exception $exception) {
            DB::rollBack();
            return redirect()->back()->withInput()->withErrors(['error' => $exception->getMessage()]);
        }

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
