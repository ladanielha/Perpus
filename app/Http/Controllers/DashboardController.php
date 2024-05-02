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
    public function index()  {
        # code...
        return Inertia::render('Dashboard', [
            'publishers' => Publisher::count(),
            'categories' => Category::count(),
            'books' => Book::count(),
            'students' => Student::count(),
            'borrow_books' => Borrow::count(),
        ]);
    }
}
