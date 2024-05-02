<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Borrow;
use App\Models\Student;

class BorrowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrows = Borrow::when(request()->q, function ($borrows) {
            $borrows = $borrows->where('name', 'like', '%' . request()->q . '%');
        })->with('student', 'book')->latest()->paginate(5);
        
        $borrows->appends(['q' => request()->q]);
        return Inertia::render('Borrow/BorrowList', [
            'borrows' => $borrows,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $books = Book::where('status','AVAILABLE')->get();
        $students = Student::get();
        return Inertia::render('Borrow/BorrowCreate', [
            'books' => $books,
            'students' => $students,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'borrowDate' => 'required',

            'maxReturnDate' => 'required',
            'selectedStudent' => 'required',
            'selectedBook' => 'required',
        ]);

        $borrow  = Borrow::create([
            'student_id' => $request->selectedStudent,
            'book_id' => $request->selectedBook,
            'borrow_date' => $request->borrowDate ?? null,
            'return_date' => $request->returnDate,
            'return_day' => $request->maxReturnDate,
            'status' => 'NOTRETURN',
        ]);
        $book = Book::find($request->selectedBook);
        $book->status = 'NOTAVAILABLE';
        $book->save();

        //redirect
        return redirect()->route('borrow.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $borrow = Borrow::with('book')->findOrFail($id);
        $books = Book::where('status','AVAILABLE')->get();
        $students = Student::get();
        return Inertia::render('Borrow/BorrowEdit', [
            'borrow' => $borrow,
            'books' => $books,
            'students' => $students,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'borrowDate' => 'required',
            'returnDate' => 'required',
            'maxReturnDate' => 'required',
            'selectedStudent' => 'required',
            'selectedBook' => 'required',
        ]);

        $borrow  = Borrow::findOrFail($id);
        $borrow->student_id = $request->selectedStudent;
        $borrow->book_id = $request->selectedBook;
        $borrow->borrow_date = $request->borrowDate;
        $borrow->return_date = $request->returnDate;
        $borrow->return_day = $request->maxReturnDate;
        $borrow->status = $request->status;
        $borrow->save();

        if ($request->status === 'RETURN') {
            $book = Book::find($request->selectedBook);            
            $book->status = 'AVAILABLE';
            $book->save();
        }
        else if ($request->status === 'NOTRETURN') {
            $book = Book::find($request->selectedBook);            
            $book->status = 'NOTAVAILABLE';
            $book->save();
        }

        //redirect
        return redirect()->route('borrow.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         //Get books by id
         $book = Borrow::findOrFail($id);
         //Delete books
         $book->delete();
         //Redirect to books index
         return redirect()->route('borrow.index');
    }

     /**
     * Display report monthly.
     */
    public function borrowreport(Request $request)
    {
        $borrows = Borrow::when(request()->month, function ($borrows) {
            $borrows = $borrows->where('borrow_date', 'like', '%' . request()->month . '%');
        })->with('student', 'book')->latest()->paginate(5);
        
        $borrows->appends(['month' => request()->month]);
        return Inertia::render('Report/ReportMonthly', [
            'borrows' => $borrows,
        ]);
    }
}
