<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)  {
        # code...
        $bookNotReturn = Borrow::borrowNotReturn()->get();
        $bookReturn = Borrow::borrowReturn()->get();
        $booknotretuned = Borrow::get();
        return Inertia::render('Dashboard', [
            'publishers' => Publisher::count(),
            'categories' => Category::count(),
            'books' => Book::count(),
            'students' => Student::count(),
            'borrow_books' => Borrow::count(),
            'book_not_return' => $bookNotReturn,
            'book_return' => $bookReturn,
            'book_notreturned' => $booknotretuned,
        ]);
    }
}
