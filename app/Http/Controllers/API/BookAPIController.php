<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookAPIController extends Controller
{
    public function getBookList(Request $request)
    {
        $books = Book::searchBook($request->q ?? "")->latest()->paginate(5);
        return response()->json($books);
    }
}
