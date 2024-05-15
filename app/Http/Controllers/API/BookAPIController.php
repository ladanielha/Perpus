<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookAPIController extends Controller
{
    public function getBookList(Request $request)
    {
        $books = Book::searchBook($request->q ?? "")->latest()->paginate(5);
        return response()->json($books);
    }

    public function createBook(BookRequest $request)
    {
        try {
            DB::beginTransaction();
            $books = Book::create([
                'name' => $request->name,
                'author' => $request->authorname,
                'category_id' => $request->selectedCategories,
                'location_id' => $request->selectedLocation,
                'publisher_id' => $request->selectedPublisher,
                'status' => 'AVAILABLE',
            ]);
            DB::commit();
            return response()->json($books, 201);

        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'message' => 'An error occurred while processing your request',
                'error' => $exception->getMessage()
            ], 500);
        }

    }
}
